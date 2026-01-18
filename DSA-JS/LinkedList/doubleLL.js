class Node{
    constructor(value=null,prev=null,next=null){
        this.value=value;
        this.prev=prev;
        this.next=next;
    }
}

class DoublyLL{
    constructor(value){
        this.size=0
        if (value !=null|| value!==undefined) {
            this.head=new Node(value);
            this.tail=this.head;
            this.size++
        }else{
            this.head=this.tail=null;
            this.size=0
        }
    }

    isEmpty(){
        return this.head===null
    }
    shiftDl(value){
        let newNode=new Node(value)
        if (!this.head) {
            this.head=this.tail=newNode
        }
        else{
            newNode.next=this.head;
            this.head.prev=newNode;
            this.head=newNode
        }
        this.size++
    }
    delete(value){
        // while(this.head !=null && this.head!=undefined){
        //     this.head=this.next
        // }
        let current=this.head;
        while (current!==null) {
            if (current.value===value) {
                if (current===value) {
                    this.head=current.next;
                        if (this.head) {
                            this.head.prev=null
                        }else{
                            this.tail=null
                        }
                }else if(current===this.tail){
                        this.tail=current.prev;
                        this.tail.next=null
                }else{
                        current.prev.next=current.next;
                        current.next.prev=current.prev;
                    }
                    this.size--;
                    return true;
                }
                current=current.next;
            }
                return false;
    }
    print() {
        let current = this.head;
        let result = "List: ";
        while(current) {
            result += current.value + " <-> ";
            current = current.next;
        }
        console.log(result + "null");
    }

}

let db1=new DoublyLL()
// console.log(db1.isEmpty())

db1.shiftDl(10)
db1.shiftDl(20)
db1.shiftDl(30)
// console.log(db1);

console.log(db1.isEmpty());
// console.log(db1.shiftDl(30))
console.log(db1.delete(20));
db1.print()

