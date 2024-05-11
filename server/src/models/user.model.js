import mongoose, {Schema} from 'mongoose'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt'

const userSchema = new Schema({

    fullname:{
     type: String,
     required: true,
     index: true
    },

   username:{
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true
   },

   email:{
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
   },

   password: {
    type: String,
    required: [true,"Password is required"]
   },

   onlinestatus: {
    type: String,
    enum: ['AVAILABLE', 'BUSY'],
    default: 'AVAILABLE'
   }
   
}, {timestamps: true});


//Method to test if password is correct or not
userSchema.methods.isPasswordCorrect = async function(password){
   return await bcrypt.compare(password, this.password)
}

// Methos to generate JWT token
userSchema.methods.generateAccessTokenAndSetCookie = async function(res) {
   const token = jwt.sign({
       _id: this._id,
       username: this.username,
       email: this.email
   },
   process.env.ACCESS_TOKEN_SECRET,
   {
       expiresIn: process.env.ACCESS_TOKEN_EXPIRY
   });

        res.cookie("token",token,{
            maxAge: 86400*1000,   
            httpOnly: true,      
         })
   

   return token;
};

// Method to hash Password
userSchema.methods.generateHashPassword = async function(password){
   const salt = await bcrypt.genSalt(10)
   const hashedPassword = await bcrypt.hash(password, salt)
   return hashedPassword
}

const User = mongoose.model("User", userSchema)
export default User