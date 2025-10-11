//forEach , filter , reducer, map, set

const arr=[10,20,30,80,31,89,90];
let sum=0;

arr.forEach((n,i,arr)=>{
    // console.log(n,i,arr);
    sum+=n
})
console.log(sum);


//filter 

console.log(arr.filter((n)=>n>10));

// const comp=(number)=> number>25;
// comp(20)

arr.filtering=function(comp){
    const ans=[];
    for (const e of this) {  //here this will point to comp you can use comp
        if(comp(e)){
            ans.push(e)
        }  
    }
    return ans;
}
console.log(arr.filtering((e)=>e>25));



