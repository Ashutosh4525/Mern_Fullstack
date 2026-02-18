import { useEffect, useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useParams } from "react-router-dom"

const SingleBook = () => {
    const {id}= useParams();
    const { user } = useAuth();
    const [book,setBook]=useState(null);

    useEffect(()=>{
        const fetchsingleBook =async () => {
            console.log("START FETCH", { id, token: user?.token }); 
            try {
                 const res = await fetch(`http://localhost:8000/api/v1/books/getbooks/${id}`, {
                    headers: { 
                    "Authorization": `Bearer ${user.token}`
                    }
                });
                
                console.log(res);
                
                const data= await res.json();
                console.log(data);
                setBook(data)
            } catch (error) {
                 console.error("Fetch error:", error);
            }
        }
        if (id && user?.token) fetchsingleBook();
    },[id,user.token])

    if (!book) {
    return <div style={{ padding: "20px" }}>Loading book details...</div>;
}
  return (
    <div style={{ width:"100%", alignItems: 'center', borderBottom: "1px solid #ddd", paddingBottom: "10px", flexWrap:"wrap"}}>  
        <div key={book.data._id} style={{ border: "1px solid #ccc", padding: "10px" }}>
        <div style={{width:"100%", display: "flex", justifyContent: "space-between", alignItems: 'center', borderBottom: "1px solid #ddd", paddingBottom: "10px", flexWrap:"wrap"}}>
          <div style={{width:"40%"}}>
            <img src={book.data.coverImage?.cloudinary?.url} alt={book.data.title} style={{ width: "100%", height:"400px" }} />
          </div>
          <div style={{width:"50%"}}>
          <h3>{book.data.title}</h3>
          {/* <p>{book.description}</p> */}
          <p>{book.data.authorID.firstname}</p>
          <p>{book.data.authorID.lastname}</p>
          <p>{book.data.authorID.bio}</p>
          </div>
          </div>
        </div>
        
        </div>

      
  )
}

export default SingleBook
