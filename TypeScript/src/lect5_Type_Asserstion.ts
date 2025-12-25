//Now this is reffered as any so ts will never assume it exact datatype
//As below we know the input is string still in next step
let response:any="42";

//it wouldn't assume that 
//so below method is called forceful type assertion
let numericLength:number=(response as string).length

// example2
type book={
    name:string;
};

let bookString='{"name":"who moved my cheese"}';

let bookObject =JSON.parse(bookString) as book
console.log(bookObject);

//ex3 Type assertion
const inputElement=document.getElementById('username') as HTMLInputElement;

let value:any
value="chai";
value=[1,2,3];
value=2.3;
value.toUpperCase();

let newval:unknown
newval="chai";
newval=[1,2,3];
newval=2.3;
//this dosent work in unknown
// newval.toUpperCase();
//
if(typeof newval==='string'){
    newval.toUpperCase();
}

try {
    
} catch (error) {
    if(error instanceof Error){
        console.log(error.message);
    }
    console.log('Error',error);
}

const data:unknown="chai aur code"
// const strData:string=data
const strData:string=data as string


///Never 

type Role='admin'|"user"

function redirectBasedOnRole(role:Role):void{
    if(role==='admin'){
        console.log("redirect to admin");
        return;
    }
     if(role==='user'){
        console.log("redirect to user");
        return;
    }
    role;
}

function neverReturn():never{
    while(true){}
}