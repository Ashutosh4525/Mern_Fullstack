import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { apiFetch, createAuthHeaders } from "../lib/api";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!user?.token) {
      return;
    }

    const timer = window.setTimeout(() => {
      apiFetch("/users/getuser", {
        headers: createAuthHeaders(user?.token),
      })
        .then((result) => {
          setUsers(result.data || []);
        })
        .catch((error) => {
          setErrorMessage(error.message || "Unable to load users.");
        });
    }, 0);

    return () => window.clearTimeout(timer);
  }, [user?.token]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to deactivate this account?")) {
      return;
    }

    try {
      await apiFetch(`/users/delete/${id}`, {
        method: "DELETE",
        headers: createAuthHeaders(user?.token),
      });
      const result = await apiFetch("/users/getuser", {
        headers: createAuthHeaders(user?.token),
      });
      setUsers(result.data || []);
    } catch (error) {
      setErrorMessage(error.message || "Unable to deactivate user.");
    }
  };

  const handleRestore = async (email) => {
    try {
      await apiFetch("/users/restore", {
        method: "POST",
        headers: createAuthHeaders(user?.token, {
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({ email }),
      });
      const result = await apiFetch("/users/getuser", {
        headers: createAuthHeaders(user?.token),
      });
      setUsers(result.data || []);
    } catch (error) {
      setErrorMessage(error.message || "Unable to restore user.");
    }
  };

  if (loading) {
    return <div className="page-message">Loading...</div>;
  }

  return (
    <main className="page-shell">
      <section className="content-panel">
        <div className="section-row">
          <div className="section-heading">
            <p className="section-kicker">Admin panel</p>
            <h2>Manage users</h2>
            <p>Deactivate and restore accounts from a mobile-friendly table layout.</p>
          </div>
          <Link className="btn btn-secondary" to={`/dashboard/${user?._id || user?.id}`}>Back to dashboard</Link>
        </div>

        {errorMessage && <div className="alert alert-error">{errorMessage}</div>}

        <div className="table-card">
          <table className="data-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Avatar</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((currentUser) => (
                <tr key={currentUser._id}>
                  <td>{currentUser.firstname && currentUser.lastname ? `${currentUser.firstname} ${currentUser.lastname}` : currentUser.email}</td>
                  <td>
                    {currentUser?.avatar?.cloudinary?.url ? (
                      <img className="table-avatar" src={currentUser.avatar.cloudinary.url} alt={currentUser.email} />
                    ) : (
                      <span className="meta-text">No image</span>
                    )}
                  </td>
                  <td>{currentUser.isDeleted ? "Inactive" : "Active"}</td>
                  <td className="table-actions">
                    {!currentUser.isDeleted ? (
                      <button className="btn btn-danger" onClick={() => handleDelete(currentUser._id)}>Deactivate</button>
                    ) : (
                      <button className="btn btn-secondary" onClick={() => handleRestore(currentUser.email)}>Restore</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default UserList;
