import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { apiFetch, createAuthHeaders } from "../lib/api";

export default function UserUpdate() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
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

    const fetchUser = async () => {
      try {
        const result = await apiFetch(`/users/getsingleuser/${id}`, {
          headers: createAuthHeaders(user?.token),
        });

        if (!ignore) {
          reset(result.data);
        }
      } catch (error) {
        if (!ignore) {
          setErrorMessage(error.message || "Unable to load profile.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    if (id && user?.token) {
      fetchUser();
    }

    return () => {
      ignore = true;
    };
  }, [id, reset, user?.token]);

  const onUpdate = async (formValues) => {
    setErrorMessage("");
    const formData = new FormData();
    formData.append("firstname", formValues.firstname || "");
    formData.append("lastname", formValues.lastname || "");
    formData.append("email", formValues.email || "");

    if (formValues.avatar?.[0]) {
      formData.append("avatar", formValues.avatar[0]);
    }

    try {
      await apiFetch(`/users/updateuser/${id}`, {
        method: "PUT",
        headers: createAuthHeaders(user?.token),
        body: formData,
      });

      navigate(-1);
    } catch (error) {
      setErrorMessage(error.message || "Update failed.");
    }
  };

  if (loading) {
    return <div className="page-message">Loading profile data...</div>;
  }

  return (
    <main className="page-shell">
      <section className="form-panel">
        <div className="section-heading">
          <p className="section-kicker">Profile</p>
          <h2>Update profile</h2>
          <p>Refresh your personal details and avatar from any device.</p>
        </div>

        {errorMessage && <div className="alert alert-error">{errorMessage}</div>}

        <form onSubmit={handleSubmit(onUpdate)} className="stack">
          <label className="field">
            <span>First name</span>
            <input {...register("firstname", { required: "First name is required" })} />
            {errors.firstname && <small className="field-error">{errors.firstname.message}</small>}
          </label>

          <label className="field">
            <span>Last name</span>
            <input {...register("lastname")} />
          </label>

          <label className="field">
            <span>Email address</span>
            <input type="email" {...register("email", { required: "Email is required" })} />
            {errors.email && <small className="field-error">{errors.email.message}</small>}
          </label>

          <label className="field">
            <span>Profile picture</span>
            <input type="file" {...register("avatar")} accept="image/*" />
          </label>

          <div className="inline-actions">
            <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : "Save changes"}
            </button>
            <button className="btn btn-ghost" type="button" onClick={() => navigate(-1)}>
              Cancel
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}
