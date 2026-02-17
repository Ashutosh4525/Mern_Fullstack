import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";

export default function EditBook() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  // 1. Fetch existing book data to pre-fill the form
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/v1/books/getbook/${id}`);
        const result = await res.json();
        if (result.success) {
          // 'reset' fills the form inputs with values from the database
          reset(result.data); 
        }
      } catch (err) {
        console.error("Error fetching book:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id, reset]);

  const onUpdate = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    
    // Check if a new file was selected
    if (data.coverImage && data.coverImage[0]) {
      formData.append("coverImage", data.coverImage[0]);
    }

    try {
      const res = await fetch(`http://localhost:8000/api/v1/books/updatebook/${id}`, {
        method: "PUT",
        headers: { "Authorization": `Bearer ${user.token}` },
        body: formData, // Fetch automatically sets multipart/form-data
      });

      if (res.ok) {
        alert("Book updated successfully!");
        navigate("/admin/books"); // Back to management page
      }
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  if (loading) return <p>Loading book details...</p>;

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <h2>Edit Book</h2>
      <form onSubmit={handleSubmit(onUpdate)} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        
        <input {...register("title", { required: "Title is required" })} placeholder="Title" />
        {errors.title && <span>{errors.title.message}</span>}

        <textarea {...register("description")} placeholder="Description" rows="4" />

        <div>
          <label>Update Cover Image:</label>
          <input type="file" {...register("coverImage")} accept="image/*" />
        </div>

        <button type="submit">Update Book</button>
      </form>
    </div>
  );
}
