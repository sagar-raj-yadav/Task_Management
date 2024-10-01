
import express from 'express';
const router=express.Router();

router.get('/register',(req,res)=>{
    res.status(200).send('welcome to register page');
  });

  export {};