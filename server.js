const express=require("express")
const app=express()
const dotenv=require("dotenv")
dotenv.config()
const cors=require("cors")
const port= process.env.PORT || 3030

//mongodb
const connection=require("./models/mongodb")

//middlewares
app.use(express.json())
app.use(cors())
app.use(express.static("cloud"))

app.get("/",(req,res)=>{
    res.send("<h1>Yavuyastra</h1>")
})
app.get("/doc",(req,res)=>{
    // console.log(__dirname)
    res.sendFile(__dirname+"/cloud/documentation.docx")
})

//local middlewares
const AuthRoute=require("./routes/auth")
const UserRoute=require("./routes/users")
const PaymentRoute=require("./routes/payment")

app.use("/auth",AuthRoute)
app.use("/users",UserRoute)
app.use("/payment",PaymentRoute)
app.listen(port,()=>console.log(`server started with port ${port}`))