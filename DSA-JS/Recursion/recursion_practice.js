function factorial(num) {
    if(num==0||num==1){
        return num
    }
    return num*factorial(num-1)
}

console.log(factorial(4));


function fibonacci(n) {
    if (n<=1) {
        return n
    }
    return fibonacci(n-1)+fibonacci(n-2)
}

console.log(fibonacci(9));
