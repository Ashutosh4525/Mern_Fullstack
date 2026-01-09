class CircularQueue{
    constructor(size){
        this.size=size;
        this.values=new Array(size);
        this.front = this.rear=-1;
    }

    enqueue(value){
        if((this.rear+1)%this.size==this.front){
            return "Queue is Full"
        }
        else if(this.front==-1){
            this.front=this.rear=0
            this.values[this.rear]=value
        }
        else{
            this.rear=(this.rear+1)%this.size
            this.values[this.rear]=value
        }
    }

    dequeue(){
            if (this.front==-1) {
                return "Queue is empty";
            }
            else if (this.front==this.rear) {
                console.log(this.values[this.front]);
                this.front=this.rear=-1
            }
            else{
                console.log(this.values[this.front]);
                this.front=(this.front+1)%this.size
            }
        }
}

let cq=new CircularQueue(5)
cq.enqueue(10)
cq.enqueue(20)
cq.enqueue(30)
cq.enqueue(40)
cq.enqueue(50)

// console.log(cq.enqueue(60));
console.log(cq.dequeue());

console.log(cq.enqueue(60));
console.log(cq.enqueue(70));
cq.dequeue();
cq.dequeue();
cq.dequeue();
cq.dequeue();
// console.log(cq.dequeue());
// console.log(cq);

