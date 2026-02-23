import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod";
import { Link,useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const schema = z.object({
        email:z.string().min(3, {message: 'Required'}),
        password:z.string(),
    })
export default function SignUp(){
    const {login} =useAuth();
    const navigate= useNavigate();
    
    const {register, handleSubmit,formState:{errors},} = useForm({
        resolver:zodResolver(schema)
    })

    const Submit= async (data)=>{
        try {
            const response= await fetch('http://localhost:8000/api/v1/users/signup',{
            method:'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(data),
        })
        const result = await response.json();
        console.log("Success:", result);

         if (response.ok && result.success ) {
            const userToStore = {
                ...result.data, 
                token: result.token,
            };
            login(userToStore);
            navigate(`/dashboard/${result.data._id}`,{ replace: true });
         }
        } catch (error) {
            console.error("Error:", error);
        }
        
    }

    return (
        <>
        <div style={{ width:"100%",display: 'flex',justifyContent:"center",flexDirection: 'column', gap: '10px' }}>
            <h1 style={{textAlign:"center"}}>Sign-Up</h1>
        <form onSubmit={handleSubmit(Submit)} style={{ width:"100%", display: 'flex', alignContent:"center",justifyContent:"center",flexDirection: 'column', gap: '10px',alignItems:"center" ,paddingTop:"10%"}}>
            <input {...register('email')} />
            {errors.email?.message && <p>{errors.email?.message}</p>}
            <input type="password" {...register('password')} />
            {errors.password?.message && <p>{errors.password?.message}</p>}
            <div>
                <button><Link to="/login">Go Back</Link></button>
                <button type="submit">Sign-up</button>
            </div>
        </form>
        </div>
        </>
    )
}