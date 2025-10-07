//function


function greeting(){
    console.log("Hello world");
    return 10;
}

// greeting(); this will not return the return value
console.log(greeting());


//parameterized function
addNumber(6,8);
function addNumber(num1,num2,num3=1){
    const sum=num1+num2+num3;
    console.log(sum);
}
// addNumber(3,4); 

//rest operator
function numadd(...num){
    let sum=0;
    for(let n of num){
        sum+=n;
    }
    console.log(sum);
}
numadd(12,3,1,3,4,6,6,6);

const arr=[9,3,43,5,2,93,1,23,3]
const arr2=[90,82,28,18]
//here rest operator is used
const [first,sec,...num]=arr;
console.log(first,sec,num);

//spread
console.log(...arr,...arr2);

//spread operator =>this is used on whole of array or objects
//but rest is used on variable when we have to catch part of unknown values in an array

// console.log(numSum(10,9));

const numSum= function (num1,num2){
    return num1+num2;
}
//function cannot be called before intialization if function is stored in variable
//but if function is used normally it can be called before intialization

//arrow function
const sumAdd=(num4,num5)=>{
    console.log("hello ji");
    return num4+num5;
}
console.log(sumAdd(2,4));

//add and sq both are function
const add=(num6,num7)=>num6+num7

const sq = n => n*n;

//In function when {} brackets are introduced then function expects return;
//so if returning just object add normal bracket() before the {} bracket

const hello=()=>({name:"Ashu",age:9})
console.log(hello());

// IIFE=> Immediatly Invoked Function
(function greet(){
    console.log("helllllllllloooooooo");
})();

(()=>{
    console.log("hello iife");
})();


//callback function 
//heart of Js

function greet1(){
    console.log("hello ji kaisa ho");
}
function meet(callback){
    console.log("meeting someone");
    callback();
}

meet(greet1);


function blinkItOrder(){
    console.log("order is being packed");
    
}

function zomatoOrder(){
    console.log("we have started preparing your food");
}


//this is not that feasable as it can only take amount
function payment(amount){
    console.log(`${amount} payment is intialized`);
    console.log("payment has done");
    zomatoOrder();

    //GST
    // rider cut
    //zomato cut
}

payment(500);

//this method is more feasable 
function payment1(amount,callback){
    console.log(`${amount} payment is intialized`);
    console.log("payment has done");
    callback();

    //GST
    // rider cut
    //zomato cut
}

payment(500,zomatoOrder);
payment(200,blinkItOrder)
