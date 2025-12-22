import React from "react";


const Sum=React.memo(({number})=>{

    function calculateSum(){
        let sum=0;

    //     for(let i=1;i<=1000;i++){
    //         sum+=i
    //     }
    //     return sum;
    // }
//in memo taking props would also not make it change
     for(let i=1;i<=number;i++){
            sum+=i
        }
        return sum;
    }

    const total= calculateSum();
    console.log("render");
    

    return(
    <>
    <h1>This is our Math Library</h1>
    <h2>Sum: {total}</h2>
    </>)
})   
export default Sum;