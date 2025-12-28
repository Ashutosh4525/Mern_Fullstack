const chai={
    name:"masala chai",
    price:20,
    isHot:true
}
//objects alwajs infereces the datatypes

let tea:{
    name:string,
    price:number,
    isHot:boolean
} 

tea={
    name:"ginger tea",
    price:25,
    isHot:true
}

//aleased object

type Tea={
    name:string,
    price:number,
    ingredient:string[]
}

const adrakChai:Tea={
    name:"Adrak chai",
    price:30,
    ingredient:["ginger","tea leaves"]
}

type Cup={size:string}

let smallCup:Cup={size:"200ml"}

let bigCup={size:"500ml", material:"steel"}

smallCup=bigCup;

// connecting 2 val type
type brew={brewTime: number}
const coffee={brewTime:5, beans:"Arabica"}
const chaiBrew:brew=coffee;

type items={name:string, quantity: number};
type address={street:string, pin:number};

// values given by type in diffrent type for code readablity
type Order={
    id:string,
    items:items,
    address:address
}

type Chai={
    name:string,
    price:number,
    isHot:boolean
}

//partial can change the data in type partially donst have to take all the value
const updateChai=(updates:Partial<Chai>)=>{
    console.log("Updating chai with", updates);
}

updateChai({price:25})
updateChai({isHot:false})


type ChaiOrder={
    name?:string,
    quantity?:number
}


//Here it is Required so all value needed
const placeOrder=(order:Required<ChaiOrder>)=>{
    console.log(order);
}

placeOrder({
    name:"masala chai",
    quantity:3
})

type newChai={
    name:string,
    price:number,
    isHot:boolean,
    ingredients:string[]
}

type BasicChaiInfo=Pick<newChai,"name"|"price">;

const chaiInfo:BasicChaiInfo={
    name:"lemon tea",
    price:30
}

type Chainew={
    name:string,
    price:number,
    isHot:boolean,
    secretIngredients:string[]
}

type PublicChai=Omit<Chainew,"secretIngredients">;