import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../firebase";

function Navbar({ currentUser }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="navbar-brand">
          <h1>Hollow Block</h1>
          <p>Business Dashboard</p>
        </div>

        <nav className="nav-links">
          <NavLink to="/" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} end>
            Home
          </NavLink>
          <NavLink to="/customers" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            Customers
          </NavLink>
          <NavLink to="/inventory" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            Inventory
          </NavLink>
          {!currentUser && (
            <NavLink to="/signup" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
              Signup
            </NavLink>
          )}
          {!currentUser && (
            <NavLink to="/login" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
              Login
            </NavLink>
          )}
          {currentUser && (
            <button type="button" className="nav-button" onClick={handleLogout}>
              Logout
            </button>
          )}
          <NavLink to="/expenses" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            Expenses
          </NavLink>
          <NavLink to="/workers" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
            Workers
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
