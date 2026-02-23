import { useEffect,useState } from "react"
import { useAuth } from "../context/AuthContext";

const UserList = () => {

    const [users, setUsers]=useState([]);
    const {user , loading} = useAuth()


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
        // if (user?.token) fetchUser();
   

    useEffect(() => {
        if (user?.token) fetchUser();
    }, [user?.token]);

    const handleDelete=async (id) => {
      if (!window.confirm("Are you sure you want to deactivate this account?")) return;

      try {
        const res=await fetch(`http://localhost:8000/api/v1/users/delete/${id}`,{
          method: 'DELETE',
                headers: { "Authorization": `Bearer ${user.token}` }
            });

            if(res.ok){
              alert("User deactivated");
              fetchUser();
            }
      } catch (error) {
        console.error("Delete Error: ", error); 
      }
    }

    const handleRestore= async (email) => {
      try {
            const res = await fetch(`http://localhost:8000/api/v1/users/restore`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${user.token}` 
                },
                body: JSON.stringify({ email }) 
            });
             if (res.ok) {
                alert("User restored!");
                fetchUser(); 
            }
        } catch (error) {
            console.error("Restore error:", error);
        }
    }
    
    if (loading) return <p>Loading...</p>;
  return (
    <>
    <div style={{ padding: "20px" }}>
     <table border="1" cellPadding="10" style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
      <thead>
        <tr><th>Title</th><th>Avatar</th><th>Status</th><th>Actions</th></tr>
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
            <td>{user.isDeleted ? "Inactive" : "Active"}</td>
          {/* <td>
              <button onClick={() => handleDelete(book._id)}>Delete</button>
          </td> */}
          <td>
            {!user.isDeleted ? (
              <button 
               onClick={() => handleDelete(user._id)}
               style={{ backgroundColor: "#ff4d4d", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" }}
               >
                 Deactivate
              </button>
                ) : (
              <button 
                onClick={() => handleRestore(user.email)}
                style={{ backgroundColor: "#4CAF50", color: "white", border: "none", padding: "5px 10px", cursor: "pointer" }}
              >
                 Restore
              </button>
              )}
          </td>                   
        </tr>
      ))}
    {/* </div> */}
    </tbody>
    </table>
    </div>
    </>
  )
}

export default UserList
