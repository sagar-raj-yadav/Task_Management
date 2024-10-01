
import mongoose , {Schema} from "mongoose";
import jwt from 'jsonwebtoken';
import becrypt from 'bcrypt';



const userSchema=new Schema(
{
  username:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
    index:true
  },
  email:{
    type:String,
    required:true,
    unique:true,
    lowercase:true,
    trim:true,
  },
  fullname:{
    type:String,
    required:true,
    trim:true,
    index:true
  },
  avtar:{
    type:String,
    required:true,
  },
  coverImage:{
    type:String
  },
  watchHistory:[
    {
      type:Schema.Types.ObjectId,
      ref:"video"
    }
  ],
  password:{
    type:String,
    required:[true,'password is required']
  },
  refreshToken:{
    type:String
  }

},
{
  timestamps:true
}

)

userSchema.pre("save",async function (next){
  if(!this.isMoodified("password")) return next();
  
  this.password=becrypt.hash(this.password,10);
  next();
})

userSchema.methods.isPasswordCorrect=async function
(password){
  return await becrypt.compare(password,this.password)
}


userSchema.methods.generateAccessToken=function(){
  return jwt.sign(
    {
      _id:this.id,
      email:this.email,
      username:this.username,
      fullname:this.fullname
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiryIn:process.env.ACCESS_TOKEN_EXPIRY
    }
  )
}


userSchema.methods.generateRefreshToken=function(){
  return jwt.sign(
    {
      _id:this.id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiryIn:process.env.REFRESH_TOKEN_EXPIRY
    }
  )
}

//refresh token me information kum hota h , because ye baar baar refresh hote rahta  h .

export const User=mongoose.model("User",userSchema)

// mongodb me users naam ka collection banega .
