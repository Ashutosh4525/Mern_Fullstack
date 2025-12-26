type ChaiOrder={
    type:string;
    sugar:number;
    strong:boolean;
}

// function makechai(order:{type:string; sugar:number; strong:boolean}){
//     console.log(order);
// }

// function servechai(order:{type:string; sugar:number; strong:boolean}){
//     console.log(order);
// }

function makechai(order:ChaiOrder){
    console.log(order);
}

function servechai(order:ChaiOrder){
    console.log(order);
}


//in ts "type" is basically used to definr user degfined datatypes
type new_name={
    name:string,
    surname:string
}

//interfaces 
//they can be used similarlly to the "type" in some case but not all
type TeaRecipe={
    water:number;
    milk:number
}

class MasalaChai implements TeaRecipe{
    water=100;
    milk= 50 ;
}

//these type are known as litteral type
// type CupSize ="small"|"large"
//class can only implement objects not above type

//2ways
//1st way
// interface CupSize{
//     size:"small"|"large"
// }

//2nd way
type CupSize={
    size:"small"|"large"
}

class Chai implements CupSize{
    size: "small" | "large"="small"
}


// type Response={{ok:true}|{ok:false}}

type Response={ok:true|false}
// interface Response{
//     ok:true|false
// }

class myRes implements Response{
     ok=true;
}

//intersection used by &

type baseChai={tealeaves:number}
type Extra = {masala:number}

type Tea=baseChai&Extra;

const cup:Tea={
    tealeaves:2,
    masala:1
}

//here bio will take input if give else it wont show error if no value is given
//in normal case it would give error
type User ={
    username:string;
    bio?:string;
}
const u1:User={username:"Ashu"};
const u2:User={username:"Ash",bio:"ash.com"}

//readonly this gets input once and cannot be changed
type config={
    readonly appName:string
    version:number
}
const cfg1:config={
    appName:"app1",
    version:1
}

//readonly so cannot change the appName
// cfg1.appName="app2"