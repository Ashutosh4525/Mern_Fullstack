import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod"
import * as z from "zod";
import { Link } from "react-router-dom";

const schema = z.object({
        email:z.string().min(3, {message: 'Required'}),
        password:z.string(),
    })
export default function SignUp(){
    
    const {register, handleSubmit,formState:{errors},} = useForm({
        resolver:zodResolver(schema)
    })

    const Submit= async (data)=>{
        const formData = new FormData();
        formData.append("email",data.email)
        formData.append("password", data.password)
        try {
            const response= await fetch('http://localhost:8000/api/v1/users/signup',{
            method:'POST',
            body: formData,
        })
        const result = await response.json();
        console.log("Success:", result);
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
            <input type="password" {...register('password', { valueAsNumber: true })} />
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