import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function FarmerDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalQuantity: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://127.0.0.1:8000/my-crops", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      const totalQuantity = data.reduce(
        (sum, crop) => sum + Number(crop.quantity),
        0
      );

      const totalRevenue = data.reduce(
        (sum, crop) => sum + Number(crop.quantity) * Number(crop.price),
        0
      );

      setStats({
        totalProducts: data.length,
        totalQuantity,
        totalRevenue,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">🌾 Farmer Overview</h1>

      {/* Stats Cards */}
      <div className="summary-cards">
        <div className="card">
          <h3>Total Products</h3>
          <p>{stats.totalProducts}</p>
        </div>

        <div className="card">
          <h3>Total Quantity</h3>
          <p>{stats.totalQuantity} kg</p>
        </div>

        <div className="card">
          <h3>Estimated Revenue</h3>
          <p>₹ {stats.totalRevenue}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <Link to="/add-crop" className="action-btn">
          ➕ Add New Crop
        </Link>

        <Link to="/my-crops" className="action-btn">
          📦 View My Crops
        </Link>

        <Link to="/reports" className="action-btn">
          📊 View Reports
        </Link>
      </div>
    </div>
  );
}

export default FarmerDashboard;
