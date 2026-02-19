import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import CustomerDashboard from "./pages/CustomerDashboard";
import FarmerDashboard from "./pages/FarmerDashboard";
import AddCrop from "./pages/AddCrop";
import Expenses from "./pages/Expenses";
import Profit from "./pages/Profit";
import Market from "./pages/Market";
import Reports from "./pages/Reports";
import FarmerLayout from "./layouts/FarmerLayout";

import "./styles/glass.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/customer-dashboard" element={<CustomerDashboard />} />

  {/* ✅ Farmer Nested Layout */}
  <Route path="/farmer-dashboard" element={<FarmerLayout />}>
    <Route index element={<FarmerDashboard />} />
    <Route path="add-crop" element={<AddCrop />} />
    <Route path="expenses" element={<Expenses />} />
    <Route path="profit" element={<Profit />} />
    <Route path="market" element={<Market />} />
    <Route path="reports" element={<Reports />} />
  </Route>
</Routes>

    </Router>
  );
}

export default App;
