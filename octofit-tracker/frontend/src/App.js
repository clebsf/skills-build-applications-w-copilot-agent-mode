import { useState } from "react";
import { Navigate, NavLink, Route, Routes } from "react-router-dom";
import Activities from "./components/Activities";
import AppModal from "./components/AppModal";
import Leaderboard from "./components/Leaderboard";
import Teams from "./components/Teams";
import Users from "./components/Users";
import Workouts from "./components/Workouts";
import "./App.css";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="app-shell bg-light min-vh-100">
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container">
          <a className="navbar-brand fw-bold" href="/">
            OctoFit Tracker
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNav"
            aria-controls="mainNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mainNav">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link${isActive ? " active fw-semibold" : ""}`
                  }
                  to="/activities"
                >
                  Activities
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link${isActive ? " active fw-semibold" : ""}`
                  }
                  to="/leaderboard"
                >
                  Leaderboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link${isActive ? " active fw-semibold" : ""}`
                  }
                  to="/teams"
                >
                  Teams
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link${isActive ? " active fw-semibold" : ""}`
                  }
                  to="/users"
                >
                  Users
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    `nav-link${isActive ? " active fw-semibold" : ""}`
                  }
                  to="/workouts"
                >
                  Workouts
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <main className="container py-4">
        <div className="card shadow-sm border-0 mb-4">
          <div className="card-body d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3">
            <div>
              <h1 className="display-6 fw-bold text-primary mb-1">
                OctoFit Tracker
              </h1>
              <p className="text-secondary mb-0">
                Frontend views powered by the Django REST API backend.
              </p>
            </div>
            <div className="d-flex align-items-center gap-2">
              <a className="btn btn-outline-primary" href="#api-routes">
                API Documentation
              </a>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => setIsModalOpen(true)}
              >
                Quick Snapshot
              </button>
            </div>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Navigate to="/activities" replace />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>

        <div id="api-routes" className="card shadow-sm border-0 mt-4">
          <div className="card-header bg-white border-0 pb-0">
            <h2 className="h5 mb-0">Backend REST API Routes</h2>
          </div>
          <div className="card-body">
            <ul className="list-group list-group-flush">
              <li className="list-group-item px-0">
                <a className="link-primary" href="/activities">
                  /api/activities/
                </a>
              </li>
              <li className="list-group-item px-0">
                <a className="link-primary" href="/leaderboard">
                  /api/leaderboard/
                </a>
              </li>
              <li className="list-group-item px-0">
                <a className="link-primary" href="/teams">
                  /api/teams/
                </a>
              </li>
              <li className="list-group-item px-0">
                <a className="link-primary" href="/users">
                  /api/users/
                </a>
              </li>
              <li className="list-group-item px-0">
                <a className="link-primary" href="/workouts">
                  /api/workouts/
                </a>
              </li>
            </ul>
          </div>
        </div>
      </main>

      <AppModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default App;
