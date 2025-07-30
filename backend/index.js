import dotenv from 'dotenv'
dotenv.config();//configer env varibles
import express from "express"
import cors from "cors"



const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));



app.get("/" , (req , res)=>{
    return res.send("<h1>smart Mess</h1>");
})





app.listen(process.env.PORT ,()=>{
    console.log(`Server is Starting on PORT ${process.env.PORT } ✔`)
})










