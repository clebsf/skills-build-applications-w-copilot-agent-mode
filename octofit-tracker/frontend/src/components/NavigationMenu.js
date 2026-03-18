import React from "react";

function NavigationMenu() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        <a
          className="navbar-brand d-flex align-items-center gap-2 fw-semibold"
          href="#overview"
        >
          <img
            src="/octofitapp-small.png"
            alt="OctoFit logo"
            width="40"
            height="40"
            className="octofit-logo"
          />
          <span>OctoFit Tracker</span>
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
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="#overview">
                Overview
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#activities">
                Activities
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#teams">
                Teams
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#workout-form">
                Log Workout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavigationMenu;
