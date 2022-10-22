const mongoose = require("mongoose")
const conn =async () => {
    try{
    const db=await mongoose.connect(process.env.MONGODB_URL_ATLAS);
    console.log("database connected successfully")
    }catch(err){
        console.log("cannot connect to database")
    }
}
const connection = conn()
module.exports={connection}