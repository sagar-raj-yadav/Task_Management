import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';


const app=express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const port =process.env.PORT || 7000;
const URL=process.env.MONGOURL;

mongoose.connect(URL).then(()=>{
console.log("db connected successfully");

app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})
}).catch(error=>console.log(error));