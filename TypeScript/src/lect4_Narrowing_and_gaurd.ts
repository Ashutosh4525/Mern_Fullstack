function getChai(kind:string|number){
    if(typeof kind==='string'){
        return `Making ${kind} chai..`
    }
    return `Chai order ${kind}`
}
//1->type narrowing
//Now when if statement runs we know that it is a string
//this will allow to do string operation 
// this is type narrowing

//2-> truthiness
//as the value passed into the function if it gets the input then a returns paticular code
//else it returns difrent paticular code
//below example
function serveChai(msg?:string){
    if(msg){
        return `Serving ${msg}`;
    }
    return `Serving default masala chai`;
}
 
//Exhaustive Checks
function orderChai(size:'small'|'large'|'medium'|number){
    if(size==='small'){
        return 'small'
    }
     if(size==='medium'){
        return 'medium'
    }
    return `chai order ${size}`
}

//knowing instance of in case of overriding
//type checking or gaurd
class kulhadChai{
    serve(){
        return `Serving chai`
    }
}

class Cutting{
    serve(){
        return `Serving chai`
    }
}
//in this function we can know which class is used 
function serve(chai:kulhadChai|Cutting){
    if(chai instanceof kulhadChai){
        return chai.serve();
    }
}

//Creating your own datatype
type chaiOrder={
    type:string,
    sugar:number
}

function isOrder(obj:any):obj is chaiOrder{
    return (
        typeof obj ==="object" &&
        obj !==null &&
        typeof obj.type ==="string" &&
        typeof obj.sugar ==="number"
    )
}

function serveOrder(item:chaiOrder|string){
    if(isOrder(item)){
        return `Serving ${item.type} chai with ${item.sugar}`
    }
    return `Serving Custom Chai: ${item}`
}

type MasalaChai={
    type:"masala";
    spiceLevel:number;
}

type GingerChai={
    type:"Ginger";
    amount:number;
}

type ElichiChai={
    type:"Elichi";
    aroma:number;
}

//This has other user-defined data type in this 
type Chai=MasalaChai|GingerChai|ElichiChai;


function MakeTea(order:Chai){
    switch (order.type) {
        case "masala":
            return "Masala Chai"
        case "Ginger":
            return 'Ginger chai'
        case "Elichi":
            return 'Elichi chai'
        // default:
        //     break;
    }
}

// Using types inner val to exhaustive check
function brew(order:MasalaChai|GingerChai){
    if('spiceLevel' in order){
        // 
    }
}

function isStringArray(arr:unknown):arr is string[]{
    if (Array.isArray(arr)){
        return arr.every(item => typeof item === 'string');
    }
    return false;
}