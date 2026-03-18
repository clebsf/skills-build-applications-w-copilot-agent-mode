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

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  async function fetchLeaderboard() {
    const endpoint = `${getApiBaseUrl()}/leaderboard/`;
    console.log("[Leaderboard] API endpoint:", endpoint);

    try {
      setLoading(true);
      setError("");
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log("[Leaderboard] Fetched data:", data);
      setLeaderboard(normalizeListResponse(data));
    } catch (fetchError) {
      console.error("[Leaderboard] Fetch error:", fetchError);
      setError(fetchError.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const filteredEntries = leaderboard.filter((entry) => {
    const user = entry.user || entry.username || entry.name || "";
    const score = entry.score !== undefined ? String(entry.score) : "";
    const value = `${user} ${score}`.toLowerCase();

    return value.includes(query.toLowerCase());
  });

  return (
    <section className="card shadow-sm border-0 mb-4">
      <div className="card-header bg-white border-0 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
        <h2 className="h4 mb-0 text-primary">Leaderboard</h2>
        <a className="link-primary fw-semibold" href="/leaderboard">
          Endpoint: /api/leaderboard/
        </a>
      </div>

      <div className="card-body">
        <form
          className="row g-2 mb-3"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="col-12 col-md-8">
            <label className="form-label" htmlFor="leaderboard-search">
              Search Leaderboard
            </label>
            <input
              id="leaderboard-search"
              type="text"
              className="form-control"
              placeholder="Filter by user or score"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <div className="col-12 col-md-4 d-flex align-items-end gap-2">
            <button
              type="button"
              className="btn btn-primary"
              onClick={fetchLeaderboard}
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

        {loading && <p className="mb-0">Loading leaderboard...</p>}
        {error && <p className="text-danger mb-0">{error}</p>}

        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col" style={{ width: "80px" }}>
                    Rank
                  </th>
                  <th scope="col">User</th>
                  <th scope="col">Score</th>
                  <th scope="col" className="text-end">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredEntries.map((entry, index) => (
                  <tr key={entry.id || entry._id || index}>
                    <td>{index + 1}</td>
                    <td>
                      {entry.user ||
                        entry.username ||
                        entry.name ||
                        `Entry ${index + 1}`}
                    </td>
                    <td>{entry.score !== undefined ? entry.score : "-"}</td>
                    <td className="text-end">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredEntries.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center text-muted py-4">
                      No leaderboard entries found.
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
