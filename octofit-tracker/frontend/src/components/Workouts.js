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

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  async function fetchWorkouts() {
    const endpoint = `${getApiBaseUrl()}/workouts/`;
    console.log("[Workouts] API endpoint:", endpoint);

    try {
      setLoading(true);
      setError("");
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log("[Workouts] Fetched data:", data);
      setWorkouts(normalizeListResponse(data));
    } catch (fetchError) {
      console.error("[Workouts] Fetch error:", fetchError);
      setError(fetchError.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const filteredWorkouts = workouts.filter((workout) => {
    const value =
      `${workout.name || ""} ${workout.type || ""} ${workout.duration || ""}`.toLowerCase();
    return value.includes(query.toLowerCase());
  });

  return (
    <section className="card shadow-sm border-0 mb-4">
      <div className="card-header bg-white border-0 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
        <h2 className="h4 mb-0 text-primary">Workouts</h2>
        <a className="link-primary fw-semibold" href="/workouts">
          Endpoint: /api/workouts/
        </a>
      </div>

      <div className="card-body">
        <form
          className="row g-2 mb-3"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="col-12 col-md-8">
            <label className="form-label" htmlFor="workouts-search">
              Search Workouts
            </label>
            <input
              id="workouts-search"
              type="text"
              className="form-control"
              placeholder="Filter by workout name or type"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <div className="col-12 col-md-4 d-flex align-items-end gap-2">
            <button
              type="button"
              className="btn btn-primary"
              onClick={fetchWorkouts}
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

        {loading && <p className="mb-0">Loading workouts...</p>}
        {error && <p className="text-danger mb-0">{error}</p>}

        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col" style={{ width: "80px" }}>
                    #
                  </th>
                  <th scope="col">Workout</th>
                  <th scope="col">Duration</th>
                  <th scope="col" className="text-end">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredWorkouts.map((workout, index) => (
                  <tr key={workout.id || workout._id || index}>
                    <td>{index + 1}</td>
                    <td>
                      {workout.name || workout.type || `Workout ${index + 1}`}
                    </td>
                    <td>{workout.duration || workout.minutes || "-"}</td>
                    <td className="text-end">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary"
                      >
                        Open
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredWorkouts.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center text-muted py-4">
                      No workouts found.
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
