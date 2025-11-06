import dotenv from 'dotenv'
dotenv.config();//configer env varibles
import express from "express"
import cors from "cors"
import { dbConnect } from './db/dbConnet.js';
import feedbackRouter from "./routes/feedback.routes.js"
import { Attendence } from './model/attendences.mode.js';



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



app.get("/data" , async(req , res)=>{
try {
    
    const reponse = await Attendence.find();


    return res.json(reponse);


} catch (error) {
    console.log("error :" , error);

    return res.json({
        message : "error"
    })
    
}


});




app.listen(process.env.PORT ,()=>{
    console.log(`Server is Starting on PORT ${process.env.PORT } ✔`)
})










