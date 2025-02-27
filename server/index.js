import express from 'express';
import Connection from './databases/db.js';
import dotenv from 'dotenv';
import router from './routes/vehicleRouter.js';
import cors from 'cors';

const app = express();

dotenv.config();



app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

const PORT = 8000;



const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

Connection(USERNAME, PASSWORD);


app.use('/api', router);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});