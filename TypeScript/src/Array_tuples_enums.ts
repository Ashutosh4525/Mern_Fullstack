// here we can declare string array now if you input any thing other than array
//it will give an error
const chaiFlavours:string[]=["Masala","Adrak"];
//number array
const chaiPrice:number[]=[1,2];

//using object of Array for utilization of array
const rating: Array<number>=[4.5,3.2];

type Chai={
    name:string;
    price:number
}
const menu:Chai[]=[
    {name:"Masala",price:15},
    {name:"Adrak",price:25}
]

const cities:readonly string[]=["Delhi","Mumbai"]
// not work
// cities.push("Pune");

const table:number[][]=[
    [1,2,3],
    [4,5,6]
]

//tuples
let chaiTuples:[string,number];
chaiTuples=["Masala",20]
// chaiTuples=[20,"Masala"]

let userInfo: [string,number, boolean?]
userInfo=["hitesh",100];
userInfo=["Ashu",200,true];

const location:readonly [number, number]=[28.66,32.22]

const chaiItems: [name:string,price:number] = ["Masala",25]

enum CupSize{
    Small,
    Medium,
    Large
}

const size =CupSize.Large;

enum Status{
    Pending=100,
    Served,
    Cancelled
}

enum ChaiType{
    Masala="masala",
    Ginger="ginger"
}

function makeChai(type: ChaiType){
    console.log(`Making: ${type}`);
}

makeChai(ChaiType.Ginger);
//makeChai("masala")

enum RandomEnu{
    ID=1,
    Name="chai"
}

const  enum Sugars{
    Low=1,
    Medium=2,
    High=3
}

//push val
//may give error if accedently pushed val
let t:[string,number]=["chai",10]
t.push("extra");