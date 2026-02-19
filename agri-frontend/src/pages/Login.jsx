import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { saveToken } from "../utils/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await API.post("/login", { email, password });

    // Save JWT Token
    saveToken(res.data.token);

    // Redirect based on role
    if (res.data.role === "customer") {
      navigate("/customer-dashboard");
    } else if (res.data.role === "farmer") {
      navigate("/farmer-dashboard");
    } else {
      navigate("/dashboard"); // fallback
    }

  } catch (err) {
    setError(err.response?.data?.message || "Login failed");
  }
};


 return (
  <div className="page-wrapper">
  <div className="glass-card">
    <h2 className="glass-title">Login</h2>

    {error && <p style={{ color: "red" }}>{error}</p>}

    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        className="glass-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="glass-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit" className="glass-btn">
        Login
      </button>
    </form>
  </div>
  </div>
);
}