import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Team Task Manager</h1>
        <h2>Login</h2>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
          />

          <button type="submit">Login</button>
        </form>

        <p>
          New user? <Link to="/signup">Create account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;