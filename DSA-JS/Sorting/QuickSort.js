function part(arr, low, high) {
    let pivot= arr[high]
    let i=low-1

    for (let j = low; j <= high - 1; j++) {
        if (arr[j] < pivot) {
            i++;
            swap(arr, i, j);
        }
    }

    swap(arr, i + 1, high);
    return i + 1;
}

function swap(arr, i, j) {
    let temp= arr[i]
    arr[i]=arr[j]
    arr[j]=temp
}

function QuickSort(arr, low, high) {
    if (low<high) {
        let pa=part(arr,low,high);

        QuickSort(arr, low, pa - 1);
        QuickSort(arr, pa+1, high)
        return arr
    }
}

let arr = [ 10, 7, 8, 9, 1, 5 ];
console.log(QuickSort(arr,0,arr.length-1));