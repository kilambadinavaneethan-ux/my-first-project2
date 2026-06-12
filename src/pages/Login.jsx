import { useState } from "react";
import { login, loginWithGoogle } from "../firebase";

function Login() {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await login(formValues.email, formValues.password);
      setMessage("Logged in successfully.");
      setFormValues({ email: "", password: "" });
    } catch (error) {
      setMessage(error.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setMessage("");

    try {
      await loginWithGoogle();
      setMessage("Logged in successfully.");
    } catch (error) {
      setMessage(error.message || "Google login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-page">
      <div className="page-header">
        <h1>Welcome back</h1>
        <p>Log in with your email and password to continue to the dashboard.</p>
      </div>

      <button type="button" className="button-secondary" onClick={handleGoogleLogin} disabled={loading}>
        {loading ? "Working..." : "Sign in with Google"}
      </button>

      <form className="login-form" onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={formValues.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
          />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            value={formValues.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </label>

        <button type="submit" className="button-primary" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

        {message && <p className="form-message">{message}</p>}
      </form>
    </section>
  );
}

export default Login;
