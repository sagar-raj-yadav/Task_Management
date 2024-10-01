
import {v2} from 'cloudinary';
import fs from 'fs';


const uploadonCloudinary=async(localFilePath)=>{
  try{
    if(!localFilePath) return null;

  const response=await  cloudinary.uploader.upload(localFilePath,
    { resuorce_type:"auto" } )
    alert("file is uploaded on cloudinary")
  }
  catch(error){

  }
}
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key:process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});