import express from "express"

const app = express();
app.get('/', (req,res)=>{
    res.status(200).json({message:"everythign is ok"})
})

app.get('/check', (req,res)=>{
    res.status(200).json({message:"checking..."})
})


app.listen(3000, ()=>{
    console.log("server is listing on port 3000")
})