import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../styles/glass.css";

function Header() {
  const [role, setRole] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decoded = jwtDecode(token);
      setRole(decoded.role);
      setName(decoded.name);
    }
  }, []);

  return (
    <div className="main-header">
      <h1>AgriProfit</h1>

      <div className="nav-links">
        <Link to="/">Home</Link>

        <Link
          to={
            role === "customer"
              ? "/customer-dashboard"
              : "/farmer-dashboard"
          }
        >
          Dashboard
        </Link>

        <Link to="/login">Logout</Link>
      </div>

      <div className="welcome-text">
        Welcome, {name}
      </div>
    </div>
  );
}

export default Header;
