import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
dotenv.config();

const PORT = process.env.PORT;

const app = express();
app.use(express.json());


app.get("/",(req,res)=>{
    res.json({message: "HELLO FROM AGENT"});
});

app.listen(PORT,()=>{
    console.log(`AGENT SERVICE is running on port ${PORT}`);
    connectDB();
})