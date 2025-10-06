

const Contact=()=>{
const users = [
{
id: 1,
name: "Aarav Shah",
email: "aarav.shah@example.com",
contactNo: "+91 9876543210",
age: 24,
city: "Mumbai"
},
{
id: 2,
name: "Arjun Mehta",
email: "arjun.mehta@example.com",
contactNo: "+91 9988776655",
age: 27,
city: "Pune"
},
{
id: 3,
name: "Priya Sharma",
email: "priya.sharma@example.com",
contactNo: "+91 9123456789",
age: 22,
city: "Delhi"
},
{
id: 4,
name: "Rohan Nair",
email: "rohan.nair@example.com",
contactNo: "+91 9090909090",
age: 29,
city: "Bangalore"
},
{
id: 5,
name: "Aisha Khan",
email: "aisha.khan@example.com",
contactNo: "+91 9876012345",
age: 25,
city: "Hyderabad"
},
{
id: 6,
name: "Karan Patel",
email: "karan.patel@example.com",
contactNo: "+91 9812345678",
age: 28,
city: "Ahmedabad"
},
{
id: 7,
name: "Sneha Deshmukh",
email: "sneha.deshmukh@example.com",
contactNo: "+91 9822334455",
age: 26,
city: "Nagpur"
},
{
id: 8,
name: "Rahul Verma",
email: "rahul.verma@example.com",
contactNo: "+91 9998877665",
age: 30,
city: "Chandigarh"
},
{
id: 9,
name: "Tanya D’Souza",
email: "tanya.dsouza@example.com",
contactNo: "+91 9876501234",
age: 23,
city: "Goa"
},
{
id: 10,
name: "Vikram Iyer",
email: "vikram.iyer@example.com",
contactNo: "+91 9867894321",
age: 31,
city: "Chennai"
}
];


return (
<>
{/* <ol>
    {users.map((n)=>(<li key={n.id}>{n.name}</li>))}
</ol> */}

<ol>
    {users.map(({id,name,email})=>(
        <li key={id}>{name} || {email}</li>
    ))}
</ol>
    
<div className="box">
    {users.map(({id,name,email,contactNo,age,city})=>(
        <div className="innerbox" key={id}>
            {/* <p>{id}</p> */}
            <p>Name: {name}</p>
            <p>Email: {email}</p>
            <p>Contact: {contactNo}</p>
            <p>Age: {age}</p>
            <p>City: {city}</p>
        </div>
    ))}
    
</div>

</>)
}
export default Contact;