import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'


export const verifyToken = (req, res, next) => {

  dotenv.config();
  const token = req.headers.authorization.split(" ")[1]
  
  if (!token) {
      return res.status(403).json({ message: 'Access denied. No token provided.' });
  }

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      req.user = decoded; 
      next();
  } catch (error) {
      return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};