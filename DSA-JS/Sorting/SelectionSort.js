function SelectionS(arr) {
    for (let i = 0; i < arr.length-1; i++) {
        let min_val=i;
        for (let j = i+1; j < arr.length; j++) {
            if(arr[j]<arr[min_val]){
            min_val=j
            }
        }
        let temp=arr[i];
        arr[i]=arr[min_val]
        arr[min_val]=temp
    }
    return arr;
}
const arr = [64, 25, 12, 22, 11];
console.log(SelectionS(arr));
