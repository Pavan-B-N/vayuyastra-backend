const { GenerateJsonWebToken } = require("../controllers/JsonToken")
const { VerifyUser } = require("../controllers/VerifyUser")


async function Login(req, res) {
    const { email, password } = req.body

    //check whether email and passwords are received properly
    if(!email || !password){
        return res.status(405).json({status:"failed",reason:"please provide email and password"})
    }

    var user = await VerifyUser(email, password,req,res);

    switch(user.accountStatus){
        case "pending":{//402 payment required
            return res.status(402).json({status:"failed",reason:"Please make a payment to active your account"})
        }
        case "blocked":{//403 forbidden
            return res.status(403).json({status:"failed",reason:"Account blocked , please contact admin"})
        }
    }

    const accessToken = GenerateJsonWebToken(user.email)
    const creditionals={
        _id:user._id,
        name:user.name,
        email:user.email,
        profilePicture:user.profilePicture,
        phone:user.phone,
        userId:user.userId,
    }
    res.status(200).json({ accessToken, creditionals })

}
module.exports = { Login }