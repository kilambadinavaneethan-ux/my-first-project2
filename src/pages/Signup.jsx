import { useState } from "react";
import { signup } from "../firebase";

function Signup() {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    if (formValues.password !== formValues.confirmPassword) {
      setMessage("Passwords do not match. Please check and try again.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await signup(formValues.email, formValues.password, formValues.name);
      setMessage("Account created successfully.");
      setFormValues({ name: "", email: "", password: "", confirmPassword: "" });
    } catch (error) {
      setMessage(error.message || "Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="signup-page">
      <div className="page-header">
        <h1>Create an account</h1>
        <p>Sign up to access the app and manage your customer data with ease.</p>
      </div>

      <form className="signup-form" onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={formValues.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </label>

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
            placeholder="Create a password"
            required
          />
        </label>

        <label>
          Confirm password
          <input
            type="password"
            name="confirmPassword"
            value={formValues.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            required
          />
        </label>

        <button type="submit" className="button-primary" disabled={loading}>
          {loading ? "Creating account..." : "Create Account"}
        </button>

        {message && <p className="form-message">{message}</p>}
      </form>
    </section>
  );
}

export default Signup;
