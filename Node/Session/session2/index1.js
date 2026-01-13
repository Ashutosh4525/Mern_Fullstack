const express= require("express")

const app=express();

const port =8000

app.listen(port,(req,res)=>{
    console.log(`Server is running ${port}..`);
})
// Inline
app.get('/product',(req,res)=>{
    console.log("running");
    res.status(200).json({
        message:"Successfull"
    })
    res.send("Product is running")
})