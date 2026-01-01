
//shaping data
interface Chai{
    readonly id:number  //not changeable
    flavour:string
    price:number
}

const masala:Chai={
    id:1,
  flavour:"masala",
  price:20
};


// interface cannot have any functionallity
interface DiscountCalculator{
    (price:number):number
}
const apply50: DiscountCalculator=(p)=>p*0.5;

interface TeaMachine{
    start():void,
    stop():void
}

const machine:TeaMachine={
    start() {
        console.log("Start");
    },
    stop() {
        console.log("stop");
    },
}

// index signature
interface ChaiRatings{
    [flavour:string]:number
}

const ratings:ChaiRatings={
    //flavour   number
    masala:4.5,
    ginger:4.4
}

interface User{
    name:string
}

interface User{
    age:number
}

// in this both user are merged
const u:User={
    name:"Ashu",
    age:25
}

interface A {a:string};
interface B {b:string}

interface C extends A,B {}



