//async await
//async function always returns a promise
// async function greet() {
//     return "ashu"
// }
// async function greet() {
//     return new Promise((resolve,reject)=>{
//         resolve("ashu");
//     })
// }
// const response=greet();
// console.log(response);
// response.then((r)=>console.log(r)).catch((e)=>console.error(e)
// )

// fetch("https://api.github.com/users")
// .then((res)=>res.json())
// .then((e)=>console.log(e));

//this is not feasiable as next line after this would also wait till the await in the below program is resolved
// const res=await fetch("https://api.github.com/users");
// const data=await res.json();
// console.log(data);

async function github() {
    const res=await fetch("https://api.github.com/users");
    const data=await res.json();
    console.log(data);
}
github();

console.log("hello awsome");
