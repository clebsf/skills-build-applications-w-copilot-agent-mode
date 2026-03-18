import React from "react";

function AppModal({ isOpen, onClose }) {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title h5">Quick Progress Snapshot</h3>
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={onClose}
              />
            </div>
            <div className="modal-body">
              <p className="mb-3">
                This week the team has logged 24 workouts and 9,320 points.
              </p>
              <table className="table table-striped table-hover table-sm align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th scope="col">Metric</th>
                    <th scope="col" className="text-end">
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Workouts</td>
                    <td className="text-end">24</td>
                  </tr>
                  <tr>
                    <td>Active Members</td>
                    <td className="text-end">31</td>
                  </tr>
                  <tr>
                    <td>Points Earned</td>
                    <td className="text-end">9,320</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={onClose}
              >
                Close
              </button>
              <a className="btn btn-primary" href="#teams" onClick={onClose}>
                Open Leaderboard
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" onClick={onClose} />
    </>
  );
}

export default AppModal;
