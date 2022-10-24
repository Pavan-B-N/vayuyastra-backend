const { VerifyJWT } = require("../controllers/VerifyJWT")
const router = require("express").Router()
const { SignupModel } = require("../models/signupModel")
router.get("/", async (req, res) => {


    var criteria;
    const { userId,email,phone } = req.query
    criteria=userId
   var query;
   if(userId){
    query={
        userId
    }
   }else if(phone){
    query={
        phone
    }
   }else if(email){
    query={
        email
    }
   }else{
    query=null
   }
    try {
        const data = await SignupModel.find(query, { password: 0, accountStatus: 0 ,_id:1})
        if (!data) {
            return res.status(404).json({ status: "failure", reason: "No record found" })
        } else {
            res.json(data)

        }
    } catch (err) {
        return res.status(500).json(err)
    }
})

module.exports = router