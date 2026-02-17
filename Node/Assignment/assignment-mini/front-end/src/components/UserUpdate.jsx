import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function UserUpdate() {
  const { id } = useParams();
  const { user } = useAuth(); // Logged-in person's token
  const { register, handleSubmit } = useForm();

  const onUpdate = async (data) => {
    const formData = new FormData();
    if (data.fullName) formData.append("fullName", data.fullName);
    if (data.avatar[0]) formData.append("avatar", data.avatar[0]);

    const res = await fetch(`http://localhost:8000/api/v1/users/updateuser/${id}`, {
      method: "PUT",
      headers: { "Authorization": `Bearer ${user.token}` },
      body: formData, 
    });

    if (res.ok) alert("User updated successfully!");
  };

  return (
    <form onSubmit={handleSubmit(onUpdate)}>
      <input {...register("fullName")} placeholder="New Name" />
      <input type="file" {...register("avatar")} />
      <button type="submit">Save Changes</button>
    </form>
  );
}
