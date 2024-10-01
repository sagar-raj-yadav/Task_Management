
// 2nd video -> how to deploy backend code in production 
// Import and configure dotenv
import dotenv from 'dotenv';
dotenv.config();


// require('dotenv').config();  -> require syntax

import  express from 'express';
//  iss import wale ko, module JS kahte h , 
 // isliye hum package.json me   type":"module" ,main ke niche likh denge 

const app=express();

const jokes=[
  {
    id:1,
    name:"joke1",
    content:"this is joke 1"
  },
  {
    id:2,
    name:"joke3",
    content:"this is joke 2"
  },
  {
    id:3,
    name:"joke3",
    content:"this is joke 3"
  }
]

app.get('/',(req,res)=>{
  res.send('server is ready');
});

app.get('/login',(req,res)=>{
  res.send('<h1>hi this is heading</h1>');
});

app.get('/api/jokes',(req,res)=>{
  res.send(jokes);           // res.json(jokes); -> yese bhi likh sakte h
});


const port=process.env.PORT || 4000 ;
// jo capital me PORT ka naam hai and 
// jo .env file me PORT ka naam hai wo bhi capital me hona chahiye (dono sa syntax must be same). 

app.listen(port,()=>{
  console.log(`port is running at http://localhost:${port}`);
})

