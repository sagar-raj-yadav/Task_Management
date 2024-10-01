

import dotenv from 'dotenv';
dotenv.config({ 
  path:'./env'
})

import connectDB from './db/DB.js';



const port =process.env.PORT || 8000; 

connectDB()
.then(()=>{
  app.listen(port,()=>{
    console.log(`server is running at port:${port} `)
  })
})
.catch((err)=>{
  console.log('mongo db connection failer!!',err)
})








/*  METHOD 1 TO CONNECT to DATABASE
import {DBNAME} from './constant.js';
import express from 'express';
const app=express();

 // this is called iife function
;(async()=>{
  try{
    await mongoose.connect(`${process.env.MONGODB_URI}/${DBNAME}`)
    app.on('error',(error)=>{
      console.log('ERR'.error);
      throw error
    })

    app.listen(process.env.PORT,()=>{
      console.log(`app is listening on port {process.env.PORT}`)
    })
  }catch(error){
    console.log("ERROR",error)
    throw err
  }
})() 

// pehle ye ; semicolon isliye lagaye h because agar kabhi kisi ne isse pehle wale line pe semicolon nhi lagaya hoga to error aa sakta h

*/