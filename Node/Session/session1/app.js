const fs= require("fs")
const {data,str} =require("./session1.js")

// fs.writeFile("file1.txt","This is file one", (err,data)=>{
//     if (err) {
//         console.log(err);
//     }
//     console.log("File created");
// })

fs.readFile("file1.txt",(err,data)=>{
    if (err) {
        console.log(err);
    }
    console.log(data.toString());
})

fs.re
console.log(data);
console.log(str);
console.log("Hello");


