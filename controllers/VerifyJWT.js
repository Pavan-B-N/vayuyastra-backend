const jwt=require("jsonwebtoken")
const VerifyJWT=async (req,res,next)=>{
    const authHeader=req.headers['authorization']
    if(!authHeader){
        return res.status(404).json({status:"failed",reason:"header not found"})
    }
    const token=authHeader.split(' ')[1];
    jwt.verify(token,process.env.JSON_WEB_TOKEN_CRYPTO_SECRET_KEY,(err,cb)=>{
        if(err){
            return res.status(502).json({status:"failed",reason:"internal server error",err})
        }
        next()
    })
}
module.exports={VerifyJWT}