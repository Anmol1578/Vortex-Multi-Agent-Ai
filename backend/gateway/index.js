import express from "express";
import dotenv from "dotenv";
import proxy from "express-http-proxy";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true, // Allow cookies to be sent
}));

app.use(cookieParser());


app.use("/auth",proxy(process.env.AUTH_SERVICE_URL));

app.get("/",(req,res)=>{
    res.json({message: "Hello From Gateway Service"});
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})