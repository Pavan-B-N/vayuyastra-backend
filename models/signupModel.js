const mongoose=require("mongoose")

const SignupSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profilePicture:{
        type:String,
        default:""
    },
    accountStatus:{//active,blocked,pending
        type:String,
        default:"pending"
    }
})

const SignupModel=mongoose.model("users",SignupSchema)

module.exports={SignupModel}