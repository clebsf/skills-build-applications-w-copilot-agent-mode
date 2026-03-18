import React from "react";

function OverviewCards({ onOpenModal }) {
  const cards = [
    {
      title: "Total Workouts",
      value: "128",
      text: "Workouts logged this month",
      linkText: "View analytics",
      href: "#activities",
      btnClass: "btn-outline-primary",
    },
    {
      title: "Active Teams",
      value: "6",
      text: "Teams competing this week",
      linkText: "See leaderboard",
      href: "#teams",
      btnClass: "btn-outline-success",
    },
    {
      title: "Avg. Session",
      value: "42 min",
      text: "Average workout duration",
      linkText: "Get recommendations",
      href: "#workout-form",
      btnClass: "btn-outline-info",
    },
  ];

  return (
    <section id="overview" className="mb-4">
      <h2 className="h3 mb-3 text-primary">Dashboard Overview</h2>
      <div className="row g-3">
        {cards.map((card) => (
          <div className="col-12 col-md-4" key={card.title}>
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <h3 className="h5 card-title text-uppercase text-muted">
                  {card.title}
                </h3>
                <p className="display-6 fw-bold mb-2">{card.value}</p>
                <p className="card-text text-secondary">{card.text}</p>
                <a
                  className="link-primary text-decoration-none fw-semibold"
                  href={card.href}
                >
                  {card.linkText}
                </a>
              </div>
              <div className="card-footer bg-white border-0">
                <button
                  type="button"
                  className={`btn btn-sm ${card.btnClass}`}
                  onClick={onOpenModal}
                >
                  Quick details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default OverviewCards;
