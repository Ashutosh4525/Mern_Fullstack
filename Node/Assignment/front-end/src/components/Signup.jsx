import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { apiFetch } from "../lib/api";

const schema = z.object({
  email: z.string().email({ message: "Enter a valid email" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export default function SignUp() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (formData) => {
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const result = await apiFetch("/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      login({
        ...result.data,
        token: result.token,
      });

      navigate(`/dashboard/${result.data._id}`, { replace: true });
    } catch (error) {
      setErrorMessage(error.message || "Signup failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="auth-shell">
      <section className="auth-panel auth-panel--hero">
        <p className="eyebrow">Create account</p>
        <h1>Start your library workspace in a minute.</h1>
        <p className="auth-copy">
          New users can sign in immediately after registering and continue into the dashboard.
        </p>
      </section>

      <section className="auth-panel auth-panel--form">
        <div className="auth-card">
          <div className="section-heading">
            <p className="section-kicker">Join now</p>
            <h2>Sign up</h2>
            <p>Use a valid email and a strong password.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="stack">
            <label className="field">
              <span>Email</span>
              <input {...register("email")} placeholder="you@example.com" />
              {errors.email && <small className="field-error">{errors.email.message}</small>}
            </label>

            <label className="field">
              <span>Password</span>
              <input type="password" {...register("password")} placeholder="Create a password" />
              {errors.password && <small className="field-error">{errors.password.message}</small>}
            </label>

            {errorMessage && <div className="alert alert-error">{errorMessage}</div>}

            <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating account..." : "Sign up"}
            </button>
          </form>

          <div className="auth-actions">
            <Link className="btn btn-secondary" to="/login">
              Back to login
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
