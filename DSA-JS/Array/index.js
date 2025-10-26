
//Creating custom array 

class MyArray{
    constructor(){
        this.length=0;
        this.data={};
    }

    //creating push function to add element in the array
    push(item){
        //here [index(this.length)] is added as multiple value can be added
        //else at every push only on element will be added and replaced by the new one
        this.data[this.length]=item;
        this.length++;
        return this.data;
    }
    //creating get method
    get(index){
        return this.data[index];
    }
    pop(){
        const lastele=this.data[this.length-1]
         delete this.data[this.length-1];
         this.length--;
         return lastele;
    }
    shift(){
        const firstele=this.data[0];
        for(let i=0;i<this.length;i++){
            this.data[i]=this.data[i+1]
        }
        // console.log(this.data);
        delete this.data[this.length-1];
        // delete this.data[0];
        this.length--;
        return firstele;
    }

    delete(input){
        const input1=this.data[input];
        console.log(input1);
        
        for (let i = input; i < this.length-1; i++) {
           this.data[i]=this.data[i+1]
        }
        delete this.data[this.length-1];
        this.length--;
        return input1;
    }
}

const array=new MyArray();
array.push("apple");
array.push("banaana")
console.log(array.push("Kiwi"))
// console.log(array);

// console.log(array.get(1));
// console.log(array.length);
// console.log(array.pop());
// console.log(array.pop());
// console.log(array.pop());
// console.log(array);
array.push("apple");
array.push("banaana")
console.log(array.data);
console.log(array.shift());
console.log(array);
console.log(array.delete(1));
console.log(array);





