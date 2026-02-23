import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function UserUpdate() {
  const navigate=useNavigate();
  const { id } = useParams();
  const { user } = useAuth(); 
  const { register, handleSubmit,reset, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(true);
  // const onUpdate = async (data) => {

    useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/v1/users/getsingleuser/${id}`, {
          headers: { "Authorization": `Bearer ${user?.token}` }
        });
        const result = await res.json();
        if (result.success) {
          // Pre-fill fields: firstname, lastname, email
          reset(result.data);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id && user?.token) fetchUser();
  }, [id, user?.token, reset]);
    // const formData = new FormData();
    // if (data.fullName) formData.append("fullName", data.fullName);
    // if (data.avatar[0]) formData.append("avatar", data.avatar[0]);

    // const res = await fetch(`http://localhost:8000/api/v1/users/updateuser/${id}`, {
    //   method: "PUT",
    //   headers: { "Authorization": `Bearer ${user.token}` },
    //   body: formData, 
    // });

  
    // if (res.ok) alert("User updated successfully!");

    const onUpdate = async (data) => {
    const formData = new FormData();
    formData.append("firstname", data.firstname);
    formData.append("lastname", data.lastname);
    formData.append("email", data.email);

    // Only append avatar if a new file was selected
    if (data.avatar && data.avatar[0]) {
      formData.append("avatar", data.avatar[0]);
    }

    try {
      const res = await fetch(`http://localhost:8000/api/v1/users/updateuser/${id}`, {
        method: "PUT",
        headers: { "Authorization": `Bearer ${user?.token}` },
        body: formData,
      });

      if (res.ok) {
        alert("Profile updated successfully!");
        navigate(-1); 
      } else {
        const errData = await res.json();
        alert(errData.message || "Update failed");
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  // };

  if (loading) return <p style={{ textAlign: "center" }}>Loading profile data...</p>;
  };

  return (
    // <form onSubmit={handleSubmit(onUpdate)}>
    //   <input {...register("fullName")} placeholder="New Name" />
    //   <input type="file" {...register("avatar")} />
    //   <button type="submit">Save Changes</button>
    // </form>
    <div style={{ maxWidth: "500px", margin: "40px auto", padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Update Profile</h2>
      
      <form onSubmit={handleSubmit(onUpdate)} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        
        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>First Name</label>
          <input 
            {...register("firstname", { required: "First name is required" })} 
            style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
          {errors.firstname && <span style={{ color: "red", fontSize: "12px" }}>{errors.firstname.message}</span>}
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>Last Name</label>
          <input 
            {...register("lastname")} 
            style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>Email Address</label>
          <input 
            {...register("email", { required: "Email is required" })} 
            type="email"
            style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc", backgroundColor: "#f9f9f9",color:"black" }}
          />
          {errors.email && <span style={{ color: "red", fontSize: "12px" }}>{errors.email.message}</span>}
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "5px" }}>Profile Picture (Avatar)</label>
          <input 
            type="file" 
            {...register("avatar")} 
            accept="image/*"
            style={{ width: "100%" }}
          />
        </div>

        <button 
          type="submit" 
          style={{ 
            marginTop: "10px", 
            padding: "12px", 
            backgroundColor: "#007bff", 
            color: "white", 
            border: "none", 
            borderRadius: "4px", 
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Save Profile Changes
        </button>

        <button 
          type="button" 
          onClick={() => navigate(-1)}
          style={{ padding: "10px", background: "none", border: "none", color: "#666", cursor: "pointer" }}
        >
          Cancel
        </button>

      </form>
    </div>
  );
}
