const jwt=require("jsonwebtoken")
const {SignupModel}=require("../models/signupModel")

const VerifyJWT=async (req,res,next)=>{
    const authHeader=req.headers['authorization']
    if(!authHeader){
        return res.status(404).json({status:"failed",reason:"header not found"})
    }
    const token=authHeader.split(' ')[1];
    jwt.verify(token,process.env.JSON_WEB_TOKEN_CRYPTO_SECRET_KEY,async (err,decoded)=>{
        if(err){
            return res.status(502).json({status:"failed",reason:"internal server error",err})
        }
        req.email=decoded.email
        // console.log(req.email)


        //validate the particular user
        const userId=req.body.userId
        console.log(userId)
        if(!userId){
            return res.status(403).json({status:"failed",reason:"please provide id of the user"})                 
        }
       
        try{
            var client=await SignupModel.findOne({_id:userId})
        }catch(err){
            return res.status(403).json({status:"failed",reason:"User not found for the given id",err})                 
        }

        if(!(client.email===req.email)){
            console.log(client.email,req.email)
            return res.status(403).json({status:"failed",reason:"userid and accessToken not matching"})          
        }


        next()
    })
}
module.exports={VerifyJWT}