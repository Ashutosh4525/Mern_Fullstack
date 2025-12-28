function makeChai(type:string,cups:number){
    console.log(`Making ${cups} cups of ${type}`);
}

makeChai("Masala",2);

//after parameter datatype declaration is what the function will return
function getChaiPrice(price:number):number{
    return price;
}


function makeOrder(order:string){
    if(!order) return null
    return order
}

//void no return
function logChai():void{
    console.log("Chai is ready");
}

//? optional may have value
function orderChai(type?:string){

}


//default value in typescript
function Chaiorder(type:string="masala"){

}


function createChai(order:{
    type:string,
    sugar:number,
    size:"small"|"large"
}):number{
    return order.sugar;
}

type order={
    type:string,
    sugar:number,
    size:"small"|"large"
}
function Chaicreate(order:order):order{
return order;
}