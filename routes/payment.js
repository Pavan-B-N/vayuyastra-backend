const {SignupModel}=require("../models/signupModel")
const router = require("express").Router()

router.post("/",async (req,res)=>{
    const {email}=req.body
SignupModel.findOneAndUpdate({email},{accountStatus:"success"},(err,cb)=>{
    if(err){
        return res.status(500).json({status:"failure",reason:"internal server error"})
    }else{
        res.json({data:cb})
    }
})
})

module.exports=router