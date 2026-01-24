function bubblesort(arr) {
    // var swapped;

    for (let i = 0; i < arr.length-1; i++) {
    // swapped=false
        for (let j = 0; j < arr.length-i-1; j++) {
            if (arr[j]>arr[j+1]) {
                let temp=arr[j];
                arr[j]=arr[j+1];
                arr[j+1]=temp;

                // swapped=true
            }            
        }
        // if (swapped==false) {
        //     break;
        // }
    }
    return(arr);
}
let arr=[64, 34, 25, 12, 22, 11, 90]
let val=bubblesort(arr);
console.log(val);
