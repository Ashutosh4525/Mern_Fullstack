let arr=[1,2,3,4]
// output=[1,3,6,10]

// let Sum=[];
// let sum=0;
// for(let i=0;i<arr.length;i++){
    // // if(arr[0]){
    // //     runningSum.push(arr[0])
    // // }
    // for(let j=i+1;j<=arr.length;j++){
        
    // }
//     sum+=arr[i];
//     Sum.push(sum)
// }
// console.log(Sum);
class Solution{
    // let arr=[];
    constructor(arry){
        this.arry=arry
    }


runningSum(arry){
    let Sum=[];
    let sum=0;
    for(let i=0;i<this.arry.length;i++){
        sum+=this.arry[i];
        Sum.push(sum)
    }
    console.log(Sum);
    return Sum;   
}
}

const arr1=new Solution(arr)
arr1.runningSum();
// runningSum(arr)


strs = ["abc", "bce", "cae"]

function notSort(strs){
    let deleteCount=0;
    const row=strs.length;
    const col=strs[0].length

    for(let i=0;i<col;i++){
        for(let j=0;j<row-1;j++){
            if(strs[j][i]>strs[j+1][i]){
                deleteCount++
                break;
            }
        }
    }
    console.log(deleteCount);
    
    return deleteCount;
}
notSort(strs)