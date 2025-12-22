//Unions should be used in limit  

//  '|' is union 
// It is nothing but use of one value from user-defined value 
let subs:number | string = 10   //or "1M"

let apiRequest: 'pending' | 'success' | 'error'='pending'
//Now api will only accept the three value given
apiRequest='success';

const orders=['12','20','28','42']

// let currentOrder;
//therefore we will give currentOrder as String
let currentOrder:string|undefined;
//here we have to give undefined as currentOrder does not satisfy the condition given
for(let order of orders){
    if(order==='28'){
        currentOrder=order
        break
    }
}
console.log(currentOrder);
//here is log currentOrder would accept string and undefined 
//that means the currentOrder is infeered as :any 
//currentOrder:any 
//any => does not care which dataType you put in
//Should avoid any as much as possible 



