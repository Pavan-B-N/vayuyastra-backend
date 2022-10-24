const mongoose = require("mongoose")
const remoteURL=process.env.MONGODB_URL_ATLAS
const localurl=process.env.MONGODB_URL
const conn =async () => {
    try{
    const db=await mongoose.connect(remoteURL);
    console.log("database connected successfully")
    }catch(err){
        console.log("cannot connect to database")
    }
}
const connection = conn()
module.exports={connection}