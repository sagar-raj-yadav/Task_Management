
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app=express();


app.use(cors({
  origin:process.env.CORS_ORIGIN,
  credentials:true
}))

//cors ka kaam ye h ki , hum frontend se kis kis jagah se request accept karenge .
//agar hum cors nii lagate h to humare server se koi bhi baat kar lega , jisse ki server pe load padega and also for security purpose.

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"));
app.use(cookieParser());

//.use middleware ke liye use hota h.

//routes import

import userRouter from './routes/user.routes.js';

//routes declaration
app.use("api/v1/users",userRouter);

// https://localhost:8000/users/register



export {app};