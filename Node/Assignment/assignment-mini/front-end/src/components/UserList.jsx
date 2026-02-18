import { useEffect,useState } from "react"
import { useAuth } from "../context/AuthContext";

const UserList = () => {

    const [users, setUsers]=useState();
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

                    setUsers(data)
            } catch (error) {
               console.error("Fetch error:", error); 
            }
        }
        if (user?.token) fetchUser();
    },[user.token])
  return (
    <div>
      {users.map((user)=>{
        
      })}
    </div>
  )
}

export default UserList
