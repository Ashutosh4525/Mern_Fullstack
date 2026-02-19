import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useParams,useNavigate } from "react-router-dom";
import BooksList from "./AllBook";
const UserView = () => {
    const { id } = useParams();
   const { user, logout } = useAuth();
  const [profile, setProfile] = useState(null);
 const navigate = useNavigate();
  useEffect(() => {
    const fetchProfile = async () => {
        try {
            const res = await fetch(`http://localhost:8000/api/v1/users/getsingleuser/${id}`, {
        headers: { 
          "Authorization": `Bearer ${user.token}`
        }
      });
      const data = await res.json();
      console.log(data);
      
      setProfile(data);
        } catch (error) {
            console.error("Fetch error:", error);
        }  
    };
    console.log(user);
    
    if (id && user?.token) fetchProfile();
  }, [id,user.token]);

  if(!profile) return <p>Loading user details...</p>;
  return (
    <>
    {/* <div style={{width:"100%",display:"flex", justifyContent:"space-between", alignItems: 'center'}}> */}
      {/* <h1 style={{paddingLeft:"10px"}}>Welcome, {profile?.data.firstname || "User"}!</h1>
      {/* <p>Email: {profile?.data.email}</p> */}
      {/* {profile?.data.avatar && <img src={profile.data.avatar} alt="Avatar" width="100" />} */}
      {/* <Link to={'/update-profile/'+id}>Edit My Profile</Link> */}
      {/* <button style={{paddingRight:"20px"}} onClick={logout}>Logout</button> */} 
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: 'center', borderBottom: "1px solid #ddd", paddingBottom: "10px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                    {profile.data.avatar && (
                        <img 
                            src={profile.data.avatar.cloudinary.url} 
                            alt="Avatar" 
                            style={{ width: "60px", height: "60px", borderRadius: "50%", objectFit: "cover" }} 
                        />
                    )}
                    <h1>Welcome, {profile.data.firstname || "User"}!</h1>
                </div>

                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                    <Link to={`/update-profile/${id}`}>Edit My Profile</Link>
                    <button onClick={logout}>Logout</button>
                </div>
                </div>
    {/* </div> */}

    <div>
      <div style={{ marginTop: "20px" }}>
                {user?.role?.includes("admin") && (
                    <div style={{ marginBottom: "20px", padding: "10px", backgroundColor: "#f0f7ff", border: "1px solid #007bff" }}>
                        <strong style={{color:"blue"}}>Admin Actions: </strong>
                        <Link to="/admin/books" style={{ marginLeft: "10px", color: "#007bff", fontWeight: "bold" }}>
                            Manage All Books
                        </Link>
                        <Link to="/admin/users" style={{ marginLeft: "10px", color: "#007bff", fontWeight: "bold" }}>
                            Manage All Users
                        </Link>
                    </div>
                )}
        </div>
        <h3>Available Books</h3>
        <BooksList/>
    </div>
    </>
)}

export default UserView;
