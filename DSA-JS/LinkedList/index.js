class Node{
    constructor(value,next=null){
        this.head=value;
        this.next=next;
    }
}

class LinkedList{
    constructor(value){
        if(value !==undefined && value !=null){
        this.head=new Node(value);
        // this.tail=this.head;
        this.length=1;
        }
        else {
            this.head = null;
            this.length=0;
        }
    }

    // pushNode(value) {
    //     let newNode=new Node(value) 
    //     if(!this.head){
    //         this.head=newNode
    //         this.tail=newNode
    //     } 
    //     this.tail.next=newNode;
    //     this.tail=newNode;
    //     this.length++;  
    // }

    pushNode(value){
        let temp=new Node(value)
        if(this.head !=null){
            let t1=this.head
            while(t1.next!=null){
                t1=t1.next
            }
            t1.next=temp
        }
        else{
            this.head=temp
        }
        this.length++;
    }

    pushFront(value){
        const newNode=new Node(value);
        newNode.next=this.head;
        this.head=newNode;
        // this.length++;
    }

    pushIndex(value,indexval){
       const newNode=new Node(value);
       let t1=this.head;
       
       while (t1.next!=null) {
        if (t1.head==indexval) {
            newNode.next=t1.next
            t1.next=newNode
        }
        t1=t1.next
       }
    }
    // popNode(){
    //      if(this.head !=null){
    //         let t1=this.head
    //         while(t1.next!=null){
    //             t1=t1.next
    //         }
    //         t1.next=temp
    //     }
    //     else{
    //         this.head=temp
    //     }
    // }

    deletell(value){
        // let t1=this.head
        // console.log(t1);
        
    //     let prev=t1;
    //     if(t1==value){
    //         this.head=t1.next
    //     while(t1.next!=null){
    //         if (t1.head==value) {
    //             prev.next= t1.next
    //             break
    //         }
    //         else{
    //             prev=t1
    //             t1=t1.next;
    //         }
    // }
    // if (t1.head==value) {
    //             prev.next=null;
    //     }
    // }
    while (this.head !== null && this.head === value) {
            this.head = this.next;
        }
    let curr=this.head;
    let prev=null;

    while (curr !== null) {
            if (curr.head === value) {
                prev.next=curr.next
                curr=curr.next;
            }else{
                prev = curr;
                curr = curr.next;
            }
        }
    }



    printlist(){
        let t1=this.head
        const list=[];
        while(t1!=null){
            // console.log(this.value)
            list.push(t1.head)
            t1=t1.next
        }
        console.log(list);
        console.log(list.join(' => ')+ ' => null');  
    }
}

const mylinklist=new LinkedList();
mylinklist.pushNode(10)
// console.log(mylinklist);
// mylinklist.printlist()
mylinklist.pushNode(20)
// mylinklist.printlist()
// console.log(mylinklist);
mylinklist.pushFront(30);
mylinklist.pushFront(40);
mylinklist.pushIndex(50,30)
// mylinklist.deletell(30)
// mylinklist.deletell(40)
mylinklist.deletell(20)
mylinklist.printlist();
// console.log(mylinklist);

