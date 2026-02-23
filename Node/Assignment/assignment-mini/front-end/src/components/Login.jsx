import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";
import SignUp from "./Signup";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

const schema = z.object({
        email:z.string().email().min(3, {message: 'Required'}),
        password:z.string(),
    })

    // type SignUpInput= z.infer<typeof schema>
export default function Login(){
    const {user,login,loading} =useAuth();
    const navigate= useNavigate();

    useEffect(()=>{
      if (user?.token) {
        navigate(`/dashboard/${user._id || user.id}`, { replace: true });
      }
    },[user,navigate])

    // if (user?.token) return null;
    const {register, handleSubmit,formState:{errors},} = useForm({
        resolver:zodResolver(schema)
    })

    const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:8000/api/v1/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      console.log(result);
      
      if (response.ok && result.success ) {
         const userToStore = {
        ...result.data, 
        token: result.token,
      };
      login(userToStore);
      // if (result.data.role?.includes("admin")) {
      //   navigate("/admin/books");
      // } else {
        navigate(`/dashboard/${result.data._id}`,{ replace: true });
      // }
        // alert("Login successful!");
      // } else {
     
    }
    //  alert(result.message || "Login failed");
      
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <>
    <div style={{ width:"100%",display: 'flex',justifyContent:"center",flexDirection: 'column', gap: '10px' }}>
    <form onSubmit={handleSubmit(onSubmit)} style={{ width:"100%",display: 'flex', alignContent:"center",justifyContent:"center",flexDirection: 'column', gap: '10px',alignItems:"center" ,paddingTop:"20%"}}>
      <input {...register("email")} placeholder="Email" />
      {errors.email && <p>{errors.email.message}</p>}

      <input type="password" {...register("password")} placeholder="Password" />
      {errors.password && <p>{errors.password.message}</p>}

      <div>
        <button><Link to="/Signup">Sign Up</Link></button>
      <button type="submit">Login</button>
      <button type="button" onClick={()=>navigate("/forgot-pass")}>Forgot password</button>
      </div>
    </form>
    </div>
    </>
  );
}