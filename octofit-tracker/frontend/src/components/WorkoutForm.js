import React from "react";

function WorkoutForm() {
  return (
    <section id="workout-form" className="mb-4">
      <h2 className="h3 mb-3 text-primary">Log New Workout</h2>
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <form>
            <div className="row g-3">
              <div className="col-12 col-md-4">
                <label htmlFor="workoutType" className="form-label fw-semibold">
                  Workout Type
                </label>
                <select
                  className="form-select"
                  id="workoutType"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select type
                  </option>
                  <option>Strength</option>
                  <option>Cardio</option>
                  <option>Yoga</option>
                  <option>HIIT</option>
                </select>
              </div>
              <div className="col-12 col-md-4">
                <label htmlFor="duration" className="form-label fw-semibold">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="duration"
                  placeholder="e.g. 45"
                />
              </div>
              <div className="col-12 col-md-4">
                <label htmlFor="date" className="form-label fw-semibold">
                  Date
                </label>
                <input type="date" className="form-control" id="date" />
              </div>
              <div className="col-12">
                <label htmlFor="notes" className="form-label fw-semibold">
                  Notes
                </label>
                <textarea
                  className="form-control"
                  id="notes"
                  rows="3"
                  placeholder="Add any details about this workout"
                />
              </div>
            </div>

            <div className="d-flex flex-wrap gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Save Workout
              </button>
              <button type="reset" className="btn btn-outline-secondary">
                Clear Form
              </button>
              <a
                className="btn btn-link link-primary text-decoration-none"
                href="#activities"
              >
                View all activity logs
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default WorkoutForm;
