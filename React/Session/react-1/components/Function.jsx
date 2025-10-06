const Function=()=>{
    function fun1(){
        alert("Function is running");
    }

    return (
        <>
        <button onClick={fun1}>Click here</button>
        </>
    );
};

export default Function;