import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


const ResetPassword = () => {
    const location=useLocation()
    const navigate=useNavigate()

    const email=location.state?.email||"";
     const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [timer,setTimer]=useState(60);
    const [canResend,setCanResend]=useState(false);

    useEffect(()=>{
        let interval;
        if (timer>0) {
             interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
        }else {
            setCanResend(true);
            clearInterval(interval);
        }
         return () => clearInterval(interval);
    },[timer])
 

    const handleResendOtp= async () =>{
        try {
             const res = await fetch(`http://localhost:8000/api/v1/users/sendotp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            if (res.ok) {
                alert("new otp send");
                setTimer(60);
                setCanResend(false)
            }
        } catch (error) {
             console.error("Resend error:", error);
        }
    }
    const handleReset = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:8000/api/v1/users/resetpass`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, otp, newPassword }),
            });
            const data = await res.json();

            if (res.ok) {
                alert("Password reset successful!");
                navigate("/login");
            } else {
                alert(data.message || "Invalid OTP or request");
            }
        } catch (error) {
            console.error("Reset error:", error);
        }
    };

    return (
        <div>
            <form onSubmit={handleReset}>
                <h2>Reset Your Password</h2>
                <p>Email: {email}</p>
                <input 
                    type="text" 
                    placeholder="Enter 6-digit OTP" 
                    value={otp} 
                    onChange={(e) => setOtp(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Enter new password" 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                    required 
                />
                <button type="submit">Update Password</button>
            </form>
            <div style={{ marginTop: '10px' }}>
                {canResend ? (
                    <button onClick={handleResendOtp} style={{ color: 'blue', cursor: 'pointer' }}>
                        Resend OTP
                    </button>
                ) : (
                    <p>Resend OTP in {timer}s</p>
                )}
            </div>
        </div>
    );
};

export default ResetPassword;