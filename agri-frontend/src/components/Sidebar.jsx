import { Link } from "react-router-dom";

import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">🌾 Agri Profit</h2>

      <ul className="sidebar-menu">
        <li>
          <NavLink to="/farmer-dashboard" end>
            Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink to="/farmer-dashboard/add-crop">
            Add Crop
          </NavLink>
        </li>

        <li>
          <NavLink to="/farmer-dashboard/expenses">
            Expenses
          </NavLink>
        </li>

        <li>
          <NavLink to="/farmer-dashboard/profit">
            Profit
          </NavLink>
        </li>

        <li>
          <NavLink to="/farmer-dashboard/market">
            Market
          </NavLink>
        </li>

        <li>
          <NavLink to="/farmer-dashboard/reports">
            Reports
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
