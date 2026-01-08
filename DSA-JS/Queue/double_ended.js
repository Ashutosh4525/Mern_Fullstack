class Deque{
    constructor(){
        this.values=[]
    }

    isEmpty(){
        //  if (this.values.length===0) {
        //     return true            
        // }
        // else return false;
        return this.values.length===0;
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

    enqueuefront(value){
       return this.values.unshift(value)
    }

    dequeueEnd(){
        if(this.isEmpty()){
            return "Queue is empty"
        }
        return this.values.pop()
    }
}

let q2=new Deque();
q2.enqueue(20);
q2.enqueue(10);
q2.enqueuefront(23);
q2.enqueuefront(40);
q2.dequeue();
q2.dequeueEnd()
console.log(q2);
