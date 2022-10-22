const {GenerateVayuyastraId}=require("./IdGenerator")
const {SignupModel}=require("../models/signupModel")

const validator=require("validator")
const bcrypt=require("bcrypt")

function userExists(email){
    const promise=new Promise(async (resolve)=>{
        const data=await SignupModel.find({email:email})
        // console.log(data,data.length===0)
        if(data.length===0){
            resolve(false)
        }else{
            resolve(true)
        }
    })
    return promise
}

const SignUp=async(req,res)=>{
    const {name,email,phone,password}=req.body

    //validate email or reva id
    if((validator.isEmail(email) || (email.includes("@reva.edu.in")))){}
    else{//405- method not allowed
        return res.status(405).json({status:'failed',reason:'invalid email',allowed:"email or reva id"})
    }

    //validate phone number
    if(!(phone.length===10)){
        return res.status(405).json({status:'failed',reason:'invalid phone number'})
    }

    //validate password
    if((password.length)<8){
        return res.status(405).json({status:'failed',reason:'password should contain atleast 8 characters'})    
    }

    //validate user exitstence
    if(await userExists(email)){//403 forbidden
        return res.status(403).json({status:'failed',reason:'user Already Exits'})          
    }

    const id=await GenerateVayuyastraId()
    const hashedPassword=await bcrypt.hash(password,10)
    const user=new SignupModel({
        email,
        name,
        phone,
        password:hashedPassword,
        userId:id
    })
    try{
        user.save()
        const credentials={
            email:user.email,
            name:user.name,
            phone:user.phone,
            userId:user.userId
        }
        res.status(200).json({status:"success",message:"Account created successfully",credentials})
    }catch(err){
        res.send("err")
    }
}
module.exports={SignUp}