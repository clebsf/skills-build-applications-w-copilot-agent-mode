import React from "react";

function ActivityTable() {
  const rows = [
    { user: "Avery", activity: "Strength", duration: "45 min", calories: 420 },
    { user: "Jordan", activity: "Cardio", duration: "38 min", calories: 360 },
    { user: "Kai", activity: "Yoga", duration: "50 min", calories: 210 },
    { user: "Taylor", activity: "HIIT", duration: "30 min", calories: 390 },
  ];

  return (
    <section id="activities" className="mb-4">
      <h2 className="h3 mb-3 text-primary">Recent Activity</h2>
      <div className="table-responsive card shadow-sm border-0">
        <div className="card-body p-0">
          <table className="table table-striped table-hover table-sm align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th scope="col">User</th>
                <th scope="col">Activity</th>
                <th scope="col">Duration</th>
                <th scope="col" className="text-end">
                  Calories
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={`${row.user}-${row.activity}`}>
                  <td>{row.user}</td>
                  <td>{row.activity}</td>
                  <td>{row.duration}</td>
                  <td className="text-end">{row.calories}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default ActivityTable;
