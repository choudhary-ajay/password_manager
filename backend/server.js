const express=require("express")
const dotenv =require("dotenv")
dotenv.config()
const {MongoClient, Db}=require("mongodb")
const bodyparser=require("body-parser")

const cors=require("cors")
const app=express()
const port=3000;
app.use(bodyparser.json())
app.use(cors())

const url="mongodb://localhost:27017/"
const client=new MongoClient(url);

const dbName="passop"

client.connect()
const db=client.db(dbName)

app.get("/",async (req,res)=>{
    const collection=db.collection("passwords")
    const findresult=await collection.find({}).toArray();
    res.json(findresult)
})


app.post("/",async (req,res)=>{
    const password=req.body
    const collection=db.collection("passwords")
    const findresult=await collection.insertOne(password)
    res.send(req.body)
})
app.delete("/",async (req,res)=>{
    const password=req.body
    const collection=db.collection("passwords")
    const findresult=await collection.deleteOne(password)
    res.send("deleted")
})
app.listen(port,()=>{
    console.log("seerver running at port ",port)
})
