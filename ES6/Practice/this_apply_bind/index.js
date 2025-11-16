// this call apply bind
//this: class object method

//strict mode vs non-strict mode
// 'use strict'
// var a=10;
// var b=20;
// console.log(a,b);

// // function greet(name,name){
// //     console.log(name,name);
// // }
// // greet("ashu","ashu1");  // ashu1 ashu1

// function greet(name1,name2){  //in strict mode
//     console.log(name1,name2);
// }
// greet("ashu","ashu1");  //ashu ashu1

// console.log(window);
// console.log(global);
//global object: in window it is window and in mode it is global
// console.log(globalThis);
//globalThis points to global object of the environment

//this keyword in node it shows empty object
//in browser it points to window object
// console.log(this);

// 'use strict'
// console.log(this);  //in strict mode it shows empty object and in browser it shows window object

const obj={
    name:"ashu",
    age:22, 
    // greet:function(){
    //     console.log(`Hi ${this.name}`);
    // }
}
// obj.greet();  //Hi ashu

const obj2={
    name:"rahul",
    age:25, 
}
// obj2.greet();  //TypeError: obj2.greet is not a function
// obj2.greet=obj.greet;
// obj2.greet();  //Hi rahul
//if n number of objects are there and we want to use same method for all objects then we have 
//this would take lot of memory
//so we would make function outside the object 
//and use call apply bind to use that function for multiple objects
//we can use __prototype__ also to achieve the same

'use strict'
function greet(){
    console.log(`Hi ${this.name}`);
}
greet();  //Hi undefined
greet.call(obj);  //Hi ashu


//apply
greet.apply(obj2);  //Hi rahul

// //bind
// const boundGreet= greet.bind(obj);
// boundGreet();  //Hi ashu

greet.bind(obj2)();  //Hi rahul

// Object.setPrototypeOf(obj,greet);
// obj.greet();  //error

function incrementAge(val){
    this.age+=val;
    console.log(this.age);
}
incrementAge.call(obj,3);
incrementAge.apply(obj2,[5]);

// class

// class Person{
//     constructor(name,age){
//         this.name=name;
//         this.age=age;
//     }
// }

// // this = {name:"Rohit", age:20}

// const p1 = new Person("Rohit",20);

// console.log(p1);


// Arrow Function: this doesnt exist for arrow function, lexical environment scope
// 'use strict'

// console.log(this);

// const greet = ()=>{
//     console.log(this);
// }

// // function meet(){
// //     console.log(this);
// // }

// greet();