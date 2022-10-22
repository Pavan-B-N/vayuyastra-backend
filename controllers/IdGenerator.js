const {CounterModel}=require("../models/counterModel")

function ProvideId(id){
    if(id<9){
        return "00"+id
    }else if(id<99){
        return "0"+id
    }else{
        return id
    }
}
async function GenerateVayuyastraId(){
    const promise=new Promise(async (resolve)=>{
        try{
            const counter=await CounterModel.findOneAndUpdate({club:"vayuyastra"},{"$inc":{"seq":1}})
            // console.log(counter)
            if(counter===null){
                const newCounter=new CounterModel({
                    club:"vayuyastra",
                    seq:1
                })
                newCounter.save()
                // console.log(newCounter.seq)
                let specificid=ProvideId(newCounter.seq)
                resolve("vayuyastra@"+specificid)
            }
            // console.log(counter.seq+1)
            let specificid=ProvideId(counter.seq+1)
            resolve("vayuyastra@"+(specificid))
        }catch{
            console.log("error")
        }
    })
    return promise
}
module.exports={GenerateVayuyastraId}