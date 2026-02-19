import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: ""
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, role } = form;

    try {
      await API.post("/register", {
        name,
        email,
        password,
        role   // "customer" or "farmer"
      });

      navigate("/login");

    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div className="page-wrapper">
      <div className="glass-card">
        <h2 className="glass-title">Register</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Name"
            className="glass-input"
            value={form.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="glass-input"
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="glass-input"
            value={form.password}
            onChange={handleChange}
          />

          {/* Role Selection */}
          <select
            name="role"
            className="glass-input"
            value={form.role}
            onChange={handleChange}
          >
            <option value="">Select Role</option>
            <option value="customer">Customer</option>
            <option value="farmer">Farmer</option>
          </select>

          <button type="submit" className="glass-btn">
            Register
          </button>

        </form>
      </div>
    </div>
  );
}
