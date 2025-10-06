//object
//key- value
const user={
    name:"ashu",
    age: 25,
    email:"shaguy@mail.com",
    amount:0,
    // greeting: function(){
    //     console.log(`Strike it ${this.name}`);
    //     return 10;
    // }
}
console.log(typeof user);

//CruD create read update delete
console.log(user.age);

//update
user.aadhar=12425;
user.amount=10;

console.log(user);

//delete
delete user.email;
console.log(user);


//not a copy just change of name but refrencing same object
const user2=user;
user2.age=21;
console.log(user);

//Object.keys
console.log(Object.keys(user));
console.log(Object.values(user));
console.log(Object.entries(user)); //this get both key and value in pair of arrays
console.log(Object.assign(user));

//for loop in obbject
for(let keys in user){
    console.log(keys, user[keys]);
}

//destructuring
const {name:userName,amount}=user;
console.log(userName,amount);

const arr=[10,20,30,50];
const [first,second]=arr;
console.log(first,second);

//for of loop array
for(let keys of Object.keys(user)){
    console.log(keys);
}

for(let keys of Object.values(user)){
    console.log(keys);
}

for(let keys of Object.entries(user)){
    console.log(keys);
}

for(let [keys,value] of Object.entries(user)){
    console.log(keys,value);
}


//acessing method in object 
// console.log(user.greeting());


//shallow copy
//spread operator
//this creates copy of object but if object has more object inside it 
//then it will not be a copy of that nested object in main object
//this dosen't make accurate copy
user3={...user}

user3.name="john";
console.log(user.name)
console.log(user3.name);

//deepcopy
const user4 = structuredClone(user);
console.log(user4);

