import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../lib/api";

const Forgetpasword = () => {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFeedback("");
    setIsSubmitting(true);

    try {
      await apiFetch("/users/forgotpass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      navigate("/reset-pass", { state: { email } });
    } catch (error) {
      setFeedback(error.message || "Unable to send OTP.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="auth-shell auth-shell--compact">
      <section className="auth-panel auth-panel--form auth-panel--single">
        <div className="auth-card">
          <div className="section-heading">
            <p className="section-kicker">Password help</p>
            <h2>Forgot password</h2>
            <p>Enter your email and we will send an OTP to reset your password.</p>
          </div>

          <form onSubmit={handleSubmit} className="stack">
            <label className="field">
              <span>Email</span>
              <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
            </label>

            {feedback && <div className="alert alert-error">{feedback}</div>}

            <button className="btn btn-primary" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send OTP"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
};

export default Forgetpasword;
