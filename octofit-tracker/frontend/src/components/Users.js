import { useEffect, useState } from "react";

function getApiBaseUrl() {
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api`;
  }

  return "http://localhost:8000/api";
}

function normalizeListResponse(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && Array.isArray(payload.results)) {
    return payload.results;
  }

  return [];
}

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  async function fetchUsers() {
    const endpoint = `${getApiBaseUrl()}/users/`;
    console.log("[Users] API endpoint:", endpoint);

    try {
      setLoading(true);
      setError("");
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log("[Users] Fetched data:", data);
      setUsers(normalizeListResponse(data));
    } catch (fetchError) {
      console.error("[Users] Fetch error:", fetchError);
      setError(fetchError.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const value =
      `${user.username || ""} ${user.name || ""} ${user.email || ""}`.toLowerCase();
    return value.includes(query.toLowerCase());
  });

  return (
    <section className="card shadow-sm border-0 mb-4">
      <div className="card-header bg-white border-0 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
        <h2 className="h4 mb-0 text-primary">Users</h2>
        <a className="link-primary fw-semibold" href="/users">
          Endpoint: /api/users/
        </a>
      </div>

      <div className="card-body">
        <form
          className="row g-2 mb-3"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="col-12 col-md-8">
            <label className="form-label" htmlFor="users-search">
              Search Users
            </label>
            <input
              id="users-search"
              type="text"
              className="form-control"
              placeholder="Filter by username, name, or email"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <div className="col-12 col-md-4 d-flex align-items-end gap-2">
            <button
              type="button"
              className="btn btn-primary"
              onClick={fetchUsers}
            >
              Refresh
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setQuery("")}
            >
              Clear
            </button>
          </div>
        </form>

        {loading && <p className="mb-0">Loading users...</p>}
        {error && <p className="text-danger mb-0">{error}</p>}

        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col" style={{ width: "80px" }}>
                    #
                  </th>
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                  <th scope="col" className="text-end">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, index) => (
                  <tr key={user.id || user._id || index}>
                    <td>{index + 1}</td>
                    <td>{user.username || user.name || `User ${index + 1}`}</td>
                    <td>{user.email || "-"}</td>
                    <td className="text-end">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary"
                      >
                        Profile
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center text-muted py-4">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
