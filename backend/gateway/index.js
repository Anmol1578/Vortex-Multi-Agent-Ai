import express from "express";
import dotenv from "dotenv";
import proxy from "express-http-proxy";

dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use("/auth",proxy(process.env.AUTH_SERVICE_URL));

app.get("/",(req,res)=>{
    res.json({message: "Hello From Gateway Service"});
});

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})