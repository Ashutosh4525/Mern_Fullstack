import { useEffect,useState } from "react"
import { useAuth } from "../context/AuthContext";

const UserList = () => {

    const [users, setUsers]=useState([]);
    const {user , loading} = useAuth()
    useEffect(()=>{
        const fetchUser= async () => {
            try {
                const res= await fetch(`http://localhost:8000/api/v1/users/getuser`,{
                    headers:{
                         "Authorization": `Bearer ${user.token}`
                    }
                });
                    const data = await res.json();
                    console.log(data);

                    setUsers(data.data)
            } catch (error) {
               console.error("Fetch error:", error); 
            }
        }
        if (user?.token) fetchUser();
    },[user.token]);

    if (loading) return <p>Loading...</p>;
  return (
    <>
     <table>
      <thead>
        <tr><th>Title</th><th>Avatar</th><th>Actions</th></tr>
      </thead>
      <tbody>
    {/* <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" , paddingBottom:"10px"}}> */}
      {users.map((user)=>(
        <tr key={user._id} >
          
          <td>{user.firstname && user.lastname ? `${user.firstname}  ${user.lastname}`:user.email}</td>
          {/* <td><img src={user.avatar.cloudinary?.url|| "no img"} alt={user._id} style={{ width: "100%", height:"400px" }} /></td> */}
          <td>
              {user?.avatar?.cloudinary?.url ? (
                <img 
                  src={user.avatar.cloudinary.url}
                  alt="Avatar"
                  style={{ width: "60px", height: "60px", borderRadius: "50%", objectFit:"cover" }}
                />
              ) : (
                "No Image"
              )}
            </td>
          <td>
              <button onClick={() => handleDelete(book._id)}>Delete</button>
          </td>
        </tr>
      ))}
    {/* </div> */}
    </tbody>
    </table>
    </>
  )
}

export default UserList
