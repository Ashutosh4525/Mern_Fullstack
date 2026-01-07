class stack{
    constructor(){
        this.values=[]
    }

    pushinStack(value){
        this.values.push(value)
    }

    popinStack(){
        if(!this.len()===0){
            return "Stack is Empty"
        }
        return this.values.pop();
    }

    len(){
       return this.values.length;
    }

    peek(){
        if(this.values.length===0){
            return "Stack empty"
        }
        return this.values[this.values.length-1]
    }
    printStack(){
        let stackval=""

        for(let i=0; i< this.values.length;i++){
            stackval+=this.values[i]+" ";
        }
        if(stackval===""){
            return "it's empty"
        }
        return stackval.trim();
    }
}
let st1=new stack();
st1.pushinStack(10);
st1.pushinStack(20);
st1.pushinStack(3);
console.log(st1.peek());
// console.log(st1.len())
// console.log(st1.popinStack())
console.log(st1.printStack());

