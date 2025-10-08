import dotenv from 'dotenv'
dotenv.config();//configer env varibles
import express from "express"
import cors from "cors"
import { dbConnect } from './db/dbConnet.js';
import feedbackRouter from "./routes/feedback.routes.js"



//database connecction
await dbConnect();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended : true}));



app.get("/" , async(req , res)=>{


    return res.json({
        text : "smart mess system" , 
    });
})


//routes :////////////////////////////
//feedback router/////////////////
app.use("/feedback" , feedbackRouter);




app.listen(process.env.PORT ,()=>{
    console.log(`Server is Starting on PORT ${process.env.PORT } ✔`)
})










