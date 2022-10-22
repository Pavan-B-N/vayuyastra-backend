const express=require("express")
const app=express()
const dotenv=require("dotenv")
dotenv.config()
const port=3030 || process.env.PORT

//mongodb
const connection=require("./models/mongodb")

//middlewares
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("<h1>Yavuyastra</h1>")
})

//local middlewares
const AuthRoute=require("./routes/auth")
const UserRoute=require("./routes/users")
// const VerifyJWT=require("./controllers/VerifyJWT")
app.use("/auth",AuthRoute)
app.use("/users",UserRoute)
// app.use(VerifyJWT)
app.listen(port,()=>console.log(`server started with port ${port}`))