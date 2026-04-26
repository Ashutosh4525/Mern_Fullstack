import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function AppShell() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const userId = user?._id || user?.id;
  const isAdmin = Array.isArray(user?.role) ? user.role.includes("admin") : user?.role === "admin";

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <>
      <header className="app-navbar">
        <div className="app-navbar__inner">
          <Link className="app-brand" to={`/dashboard/${userId}`}>
            <span className="app-brand__mark">A</span>
            <span>Assignment Mini</span>
          </Link>

          <nav className="app-nav">
            <Link to={`/dashboard/${userId}`}>Dashboard</Link>
            {isAdmin && <Link to="/admin/books">Books</Link>}
            {isAdmin && <Link to="/admin/users">Users</Link>}
            <Link to={`/update-profile/${userId}`}>Profile</Link>
          </nav>

          <div className="app-navbar__actions">
            <span className="app-navbar__user">{user?.email}</span>
            <button className="btn btn-ghost" type="button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </header>

      <Outlet />
    </>
  );
}

export default AppShell;
