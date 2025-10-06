
const Variable=()=>{
    //string
    let name="TOM";

    //number
    let contactNo=9872522389;

    let email="asdf@mail.com"

    //boolean
    let isLoggedIn=true;
    //in this if string is a input and that string is not empty then true else false
    //same with number if 0 then false

    //array

    let fruitArr=["apple","mango","kiwi","grapes"]
    //1st way
    let arr1=fruitArr.map((fruit,i)=>(<li key={i}>{fruit}</li>))



    //object
    let obj={
        subject:"React Js",
        duration:"30 hours"
    }
    let {subject,duration}=obj;

    return(
        <>
        <h2>Variables</h2>
        <p>Name: {name}</p>
        <p>contactNo: {contactNo}</p>
        <p>Email:{email}</p>
        <p>{isLoggedIn ? "Logged In":"Logged Out"}</p>
        <ul>{arr1}</ul>
        <p>{subject}</p>
        <p>{duration}</p>
        </>
    )
}

export default Variable;