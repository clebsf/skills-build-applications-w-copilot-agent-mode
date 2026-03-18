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

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");

  async function fetchActivities() {
    const endpoint = `${getApiBaseUrl()}/activities/`;
    console.log("[Activities] API endpoint:", endpoint);

    try {
      setLoading(true);
      setError("");
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      console.log("[Activities] Fetched data:", data);
      setActivities(normalizeListResponse(data));
    } catch (fetchError) {
      console.error("[Activities] Fetch error:", fetchError);
      setError(fetchError.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchActivities();
  }, []);

  const filteredActivities = activities.filter((activity) => {
    const name = activity.name || activity.title || "";
    const type = activity.type || activity.category || "";
    const value = `${name} ${type}`.toLowerCase();

    return value.includes(query.toLowerCase());
  });

  return (
    <section className="card shadow-sm border-0 mb-4">
      <div className="card-header bg-white border-0 d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2">
        <h2 className="h4 mb-0 text-primary">Activities</h2>
        <a className="link-primary fw-semibold" href="/activities">
          Endpoint: /api/activities/
        </a>
      </div>

      <div className="card-body">
        <form
          className="row g-2 mb-3"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="col-12 col-md-8">
            <label className="form-label" htmlFor="activity-search">
              Search Activities
            </label>
            <input
              id="activity-search"
              type="text"
              className="form-control"
              placeholder="Filter by name or type"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
          <div className="col-12 col-md-4 d-flex align-items-end gap-2">
            <button
              type="button"
              className="btn btn-primary"
              onClick={fetchActivities}
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

        {loading && <p className="mb-0">Loading activities...</p>}
        {error && <p className="text-danger mb-0">{error}</p>}

        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col" style={{ width: "80px" }}>
                    #
                  </th>
                  <th scope="col">Name</th>
                  <th scope="col">Details</th>
                  <th scope="col" className="text-end">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredActivities.map((activity, index) => (
                  <tr key={activity.id || activity._id || index}>
                    <td>{index + 1}</td>
                    <td>
                      {activity.name ||
                        activity.title ||
                        `Activity ${index + 1}`}
                    </td>
                    <td>
                      {activity.type ||
                        activity.category ||
                        activity.duration ||
                        "-"}
                    </td>
                    <td className="text-end">
                      <button
                        type="button"
                        className="btn btn-sm btn-outline-primary"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredActivities.length === 0 && (
                  <tr>
                    <td colSpan={4} className="text-center text-muted py-4">
                      No activities found.
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
