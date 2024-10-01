
import express from 'express';
const app=express();


app.get('/',(req,res)=>{
  res.send('welcome to backend main page');
})


app.get('/register',(req,res)=>{
  res.send('welcome to register page');
})

const port=3000;

app.listen(port,()=>{
  console.log(`server iscdfd runnning on http://localhost:${port}`)
})