import { useEffect,useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Forgetpasword = () => {
    const [email,setEmail]=useState('');
    const navigate=useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();
            try {
                const res= await fetch(`http://localhost:8000/api/v1/users/forgotpass`,{
                    method:'POST',
                    headers: {
                    'Content-Type': 'application/json' 
                },
                body:JSON.stringify({email}),
               
            });
            const data=await res.json()
            console.log(data);
            
               if (res.ok) {
                navigate("/reset-pass",{state:{email}})
               } 
            
                
            } catch (error) {
                console.log(error);
            }
        }

        
    
  return (
    <div>
      <form onSubmit={handleSubmit}>
            <h2>Forgot Password</h2>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <button type="submit">Send OTP</button>
        </form>
    </div>
  )
}

export default Forgetpasword
