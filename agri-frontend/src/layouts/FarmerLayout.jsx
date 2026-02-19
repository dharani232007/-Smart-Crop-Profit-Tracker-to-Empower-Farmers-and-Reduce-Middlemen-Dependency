import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function FarmerLayout() {
  return (
    <div className="dashboard-wrapper">
      <Sidebar />

      <div className="content-area">
        <Outlet />
      </div>
    </div>
  );
}

export default FarmerLayout;
