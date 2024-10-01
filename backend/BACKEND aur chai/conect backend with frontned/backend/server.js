
import dotenv from 'dotenv';
dotenv.config();

import express from 'express';

const app=express();

app.get('/',(req,res)=>{
  res.send('server is ready');
});

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

app.get('/api/jokes',(req,res)=>{
  res.send(jokes);           // res.json(jokes); -> yese bhi likh sakte h
});

const port=process.env.PORT || 5000;

app.listen(port,()=>{
  console.log(`server is running at http://localhost:${port}`);
});