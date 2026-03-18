import React from "react";

function TeamTable() {
  const teams = [
    { name: "Octo Runners", members: 12, points: 940 },
    { name: "Flex Force", members: 10, points: 870 },
    { name: "Cardio Crew", members: 9, points: 810 },
    { name: "Power Pulse", members: 11, points: 780 },
  ];

  return (
    <section id="teams" className="mb-4">
      <h2 className="h3 mb-3 text-primary">Team Leaderboard</h2>
      <div className="table-responsive card shadow-sm border-0">
        <div className="card-body p-0">
          <table className="table table-striped table-hover table-sm align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th scope="col">Team</th>
                <th scope="col" className="text-end">
                  Members
                </th>
                <th scope="col" className="text-end">
                  Points
                </th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team.name}>
                  <td>
                    <a
                      className="link-primary text-decoration-none fw-semibold"
                      href="#overview"
                    >
                      {team.name}
                    </a>
                  </td>
                  <td className="text-end">{team.members}</td>
                  <td className="text-end">{team.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default TeamTable;
