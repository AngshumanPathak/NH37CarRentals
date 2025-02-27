import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import Admin from '../models/adminSchema.js';

export const adminLogin = async (request, response) => {
    dotenv.config();

    const { email, password } = request.body;
    console.log(request.body);

    try {
        let user = await Admin.findOne({ email:"bishalboro268@gmail.com"});
        console.log("User found:", user);

        if (!user) {
            return response.status(401).json({ message: "Invalid credentials 1" });
        }

        
        if (password === user.password) {
            
            const token = jwt.sign(
                { id: user._id},
                process.env.JWT_SECRET,
                { expiresIn: '1d' }
            );

            return response.status(200).json({ data: { user, token }, message: "Successfully logged in" });
        } else {
            return response.status(401).json({ message: "Invalid credentials 2" });
        }
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};



export const Login = async (req, res) => {
    const { email, password } = req.body;

    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        return res.status(200).json({ message: "Login successful" });
    } else {
        return res.status(401).json({ message: "Invalid credentials" });
    }
};