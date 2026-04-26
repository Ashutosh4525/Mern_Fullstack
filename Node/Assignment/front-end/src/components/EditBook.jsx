import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { apiFetch, createAuthHeaders } from "../lib/api";

export default function EditBook() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    let ignore = false;

    const fetchBook = async () => {
      try {
        const result = await apiFetch(`/books/getbooks/${id}`);

        if (!ignore) {
          reset({
            title: result.data.title,
            description: result.data.description,
            authorID: result.data.authorID?._id,
            publishedDate: result.data.publishedDate ? result.data.publishedDate.slice(0, 10) : "",
          });
        }
      } catch (error) {
        if (!ignore) {
          setErrorMessage(error.message || "Unable to load book.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchBook();

    return () => {
      ignore = true;
    };
  }, [id, reset]);

  const onUpdate = async (formValues) => {
    setErrorMessage("");
    const formData = new FormData();
    formData.append("title", formValues.title);
    formData.append("description", formValues.description || "");
    formData.append("publishedDate", formValues.publishedDate || "");

    if (formValues.authorID) {
      formData.append("authorID", formValues.authorID);
    }

    if (formValues.coverImage?.[0]) {
      formData.append("coverImage", formValues.coverImage[0]);
    }

    try {
      await apiFetch(`/books/updatebook/${id}`, {
        method: "PUT",
        headers: createAuthHeaders(user?.token),
        body: formData,
      });

      navigate("/admin/books");
    } catch (error) {
      setErrorMessage(error.message || "Update failed.");
    }
  };

  if (loading) {
    return <div className="page-message">Loading book details...</div>;
  }

  return (
    <main className="page-shell">
      <section className="form-panel">
        <div className="section-heading">
          <p className="section-kicker">Admin panel</p>
          <h2>Edit book</h2>
          <p>Update the title, date, and cover image in one place.</p>
        </div>

        {errorMessage && <div className="alert alert-error">{errorMessage}</div>}

        <form onSubmit={handleSubmit(onUpdate)} className="stack">
          <label className="field">
            <span>Title</span>
            <input {...register("title", { required: "Title is required" })} placeholder="Title" />
            {errors.title && <small className="field-error">{errors.title.message}</small>}
          </label>

          <label className="field">
            <span>Description</span>
            <textarea {...register("description")} placeholder="Description" rows="5" />
          </label>

          <label className="field">
            <span>Published date</span>
            <input type="date" {...register("publishedDate")} />
          </label>

          <label className="field">
            <span>Update cover image</span>
            <input type="file" {...register("coverImage")} accept="image/*" />
          </label>

          <div className="inline-actions">
            <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Updating..." : "Update book"}
            </button>
            <button className="btn btn-ghost" type="button" onClick={() => navigate("/admin/books")}>
              Cancel
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
