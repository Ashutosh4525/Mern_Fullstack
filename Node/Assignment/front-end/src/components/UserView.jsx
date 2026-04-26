import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BooksList from "./AllBook";
import { useAuth } from "../context/useAuth";
import { apiFetch, createAuthHeaders } from "../lib/api";

const UserView = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let ignore = false;

    const fetchProfile = async () => {
      try {
        const result = await apiFetch(`/users/getsingleuser/${id}`, {
          headers: createAuthHeaders(user?.token),
        });

        if (!ignore) {
          setProfile(result.data);
        }
      } catch (error) {
        if (!ignore) {
          setErrorMessage(error.message || "Unable to load profile.");
        }
      }
    };

    if (id && user?.token) {
      fetchProfile();
    }

    return () => {
      ignore = true;
    };
  }, [id, user?.token]);

  if (errorMessage) {
    return <div className="page-shell"><div className="alert alert-error">{errorMessage}</div></div>;
  }

  if (!profile) {
    return <div className="page-message">Loading user...</div>;
  }

  const isAdmin = Array.isArray(user?.role) ? user.role.includes("admin") : user?.role === "admin";

  return (
    <main className="page-shell">
      <section className="content-panel">
        <div className="section-row section-row--top">
          <div className="section-heading">
            <h1>{profile.firstname || profile.email}</h1>
          </div>
          {isAdmin && (
            <div className="inline-actions">
              <Link className="btn btn-secondary" to="/admin/books">Books</Link>
              <Link className="btn btn-secondary" to="/admin/users">Users</Link>
            </div>
          )}
        </div>

        <div className="search-row">
          <label className="search-box">
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search books or authors"
            />
          </label>
          <Link className="btn btn-secondary" to={`/update-profile/${id}`}>
            Edit profile
          </Link>
        </div>

        <BooksList
          searchTerm={searchTerm}
          emptyMessage={searchTerm ? "No matching books or authors." : "No books found."}
        />
      </section>
    </main>
  );
};

export default UserView;
