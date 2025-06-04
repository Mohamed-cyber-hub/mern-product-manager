import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import productsRoutes from './routes/productsRoutes.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: "http://localhost:5173",
}));



app.use(express.json());// Middleware to parse JSON bodies

app.use("/api/products", productsRoutes);
app.get('/', (req, res) => {
    res.send('Welcome to the Notes API');
});


app.get("/", (req, res) => {
    res.send("Hello, World!");
});


connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
})