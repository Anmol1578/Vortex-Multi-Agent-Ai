import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import router from "./routes/agent.route.js";
dotenv.config();

const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use("/",router);

app.get("/",(req,res)=>{
    res.json({message: "HELLO FROM AGENT"});
});

app.listen(PORT,()=>{
    console.log(`AGENT SERVICE is running on port ${PORT}`);
    connectDB();
})
