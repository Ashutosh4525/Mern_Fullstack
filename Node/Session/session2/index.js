const fs= require("fs")
const path= require("path")
const http=require("http")
// creating file
// fs.writeFile("text1.txt","this is file",(err,data)=>{
//     if (err) {
//         console.log(err);
//     }
//     console.log("File created");
// })

// updating the file
// fs.appendFile("text1.txt","this is new text",(err,data)=>{
//     if (err) {
//         console.log(err);
//     }
//     console.log("File updated");
// })


// deleting file
// fs.unlink("text1.txt",(err,data)=>{
//      if (err) {
//         console.log(err);
//     }
//     console.log("File deleted");
// })

// folder creation
// fs.mkdir("demo",(err,data)=>{
//      if (err) {
//         console.log(err);
//     }
//     console.log("directory created");
// })

// deleting Folder
// fs.rmdir("demo",(err,data)=>{
//     if (err) {
//         console.log(err);
//     }
//     console.log("directory deleted");
// })

// fs.writeFile("./demo/demo.txt","this is demo",(err,data)=>{
//     if (err) {
//         console.log(err);
//     }
//     console.log("Demo File created");
// })

// fs.writeFile("./demo/demo.js","hello",(err,data)=>{
//     if (err) {
//         console.log(err);
//     }
//     console.log("Demo File created");
// })

// const p="./demo/demo.js"
// path.basename(p)



// http
const port =8000;
const server=http.createServer((req,res)=>{
    console.log("==Running==");
    const url=req.url;
    const method=req.method
    console.log(url,method);
    if (url==="/contact" && method==="GET") {
        res.writeHead(200)
        res.write("This is contact page")
    }else{
    res.writeHead(404);
    res.write("Page not found")
    }
    res.end()    
})

server.listen(port,()=>{
    console.log(`Server is running ${port}`);
    
})