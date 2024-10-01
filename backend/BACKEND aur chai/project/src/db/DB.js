
import mongoose from 'mongoose';
import DB_NAME from '../constant.js';

const connectdb=async()=>{
  try{
   const connectionInstance= await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
   
   console.log(`\n MONGODB connected completed !! DB HOST:${connectionInstance.connection.host}`);
   
  }catch(error){
    console.log('mongodb connection error',error);
    process.exit();
  }
}

export default connectdb;