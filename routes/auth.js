const router=require("express").Router()

const {SignUp}=require("../controllers/Signup")
const {Login}=require("../controllers/Login")
router.post("/signup",async(req,res)=>{
    SignUp(req,res)
})

router.post("/login",(req,res)=>{
    Login(req,res)
})
module.exports=router