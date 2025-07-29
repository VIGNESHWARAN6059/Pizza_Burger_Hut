import { Link } from "react-router-dom";
import { FaPlus, FaBoxOpen } from "react-icons/fa"; // Import icons
import "../style/adminpanel.css";

export default function AdminPanel() {
  return (
    <div className="admin-panel">
      <h2>Admin Dashboard</h2>
      <div className="admin-actions">
        <Link to="/admin/add-food" className="admin-link">
          <FaPlus style={{ marginRight: "8px" }} />
          Add New Food
        </Link>
        <Link to="/orders" className="admin-link">
          <FaBoxOpen style={{ marginRight: "8px" }} />
          View All Orders
        </Link>
      </div>
    </div>
  );
}
