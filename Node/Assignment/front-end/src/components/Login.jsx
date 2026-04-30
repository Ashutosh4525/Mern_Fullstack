import { useEffect, useState } from "react";
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

export default function Login() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user?.token) {
      navigate(`/dashboard/${user._id || user.id}`, { replace: true });
    }
  }, [user, navigate]);

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
      const result = await apiFetch("/users/login", {
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
      setErrorMessage(error.message || "Login failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="auth-shell">
      <section className="auth-panel auth-panel--hero">
        {/* <p className="eyebrow">Assignment Mini</p> */}
        <h1>Book management.</h1>
        <p className="auth-copy">
          Browse books, update your profile, and manage records from a more polished dashboard on desktop and mobile.
        </p>
      </section>

      <section className="auth-panel auth-panel--form">
        <div className="auth-card">
          <div className="section-heading">
            <p className="section-kicker">Welcome back</p>
            <h2>Login</h2>
            <p>Enter your email and password to continue.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="stack">
            <label className="field">
              <span>Email</span>
              <input {...register("email")} placeholder="you@example.com" />
              {errors.email && <small className="field-error">{errors.email.message}</small>}
            </label>

            <label className="field">
              <span>Password</span>
              <input type="password" {...register("password")} placeholder="Enter your password" />
              {errors.password && <small className="field-error">{errors.password.message}</small>}
            </label>

            {errorMessage && <div className="alert alert-error">{errorMessage}</div>}

            <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Login"}
            </button>
          </form>

          <div className="auth-actions">
            <Link className="btn btn-secondary" to="/signup">
              Create account
            </Link>
            <button className="btn btn-ghost" type="button" onClick={() => navigate("/forgot-pass")}>
              Forgot password
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
