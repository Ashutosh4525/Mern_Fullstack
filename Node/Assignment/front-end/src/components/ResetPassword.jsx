import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiFetch } from "../lib/api";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [timer, setTimer] = useState(60);
  const [feedback, setFeedback] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const canResend = timer === 0;

  useEffect(() => {
    if (timer === 0) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setTimer((current) => (current > 0 ? current - 1 : 0));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [timer]);

  const handleResendOtp = async () => {
    setFeedback("");

    try {
      await apiFetch("/users/forgotpass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      setTimer(60);
      setFeedback("A new OTP has been sent to your email.");
    } catch (error) {
      setFeedback(error.message || "Unable to resend OTP.");
    }
  };

  const handleReset = async (event) => {
    event.preventDefault();
    setFeedback("");
    setIsSubmitting(true);

    try {
      await apiFetch("/users/resetpass", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      navigate("/login");
    } catch (error) {
      setFeedback(error.message || "Invalid OTP or request.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="auth-shell auth-shell--compact">
      <section className="auth-panel auth-panel--form auth-panel--single">
        <div className="auth-card">
          <div className="section-heading">
            <p className="section-kicker">Secure reset</p>
            <h2>Reset password</h2>
            <p>{email ? `OTP was sent to ${email}.` : "Go back and request an OTP first."}</p>
          </div>

          <form onSubmit={handleReset} className="stack">
            <label className="field">
              <span>OTP</span>
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(event) => setOtp(event.target.value)}
                required
              />
            </label>

            <label className="field">
              <span>New password</span>
              <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                required
              />
            </label>

            {feedback && <div className={canResend ? "alert alert-success" : "alert alert-error"}>{feedback}</div>}

            <button className="btn btn-primary" type="submit" disabled={isSubmitting || !email}>
              {isSubmitting ? "Updating..." : "Update password"}
            </button>
          </form>

          <div className="inline-actions">
            {canResend ? (
              <button className="btn btn-ghost" type="button" onClick={handleResendOtp}>
                Resend OTP
              </button>
            ) : (
              <p className="meta-text">Resend OTP in {timer}s</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default ResetPassword;
