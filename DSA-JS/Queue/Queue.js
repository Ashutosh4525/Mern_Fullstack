class Queue{
    constructor(){
        this.values=[]
    }

    isEmpty(){
        if (this.values.length===0) {
            return true            
        }
        else return false;
    }
    enqueue(value){
        // if(!this.values){
        this.values.push(value);
        // }
    }
    dequeue(){
        if (this.isEmpty()) {
            return "queue is empty"
        }
        else{
            return this.values.shift();
        }
    }
}
let q1=new Queue();
q1.enqueue(10);
q1.enqueue(20);
q1.enqueue(30);
console.log(q1.dequeue());


