import { useState } from "react";
import NavigationMenu from "./components/NavigationMenu";
import OverviewCards from "./components/OverviewCards";
import ActivityTable from "./components/ActivityTable";
import TeamTable from "./components/TeamTable";
import WorkoutForm from "./components/WorkoutForm";
import AppModal from "./components/AppModal";
import "./App.css";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="app-shell bg-light min-vh-100">
      <NavigationMenu />

      <main className="container py-4">
        <h1 className="display-6 fw-bold text-primary mb-1">
          OctoFit Tracker Dashboard
        </h1>
        <p className="text-secondary mb-4">
          Track activities, compare teams, and log workouts in a consistent
          Bootstrap layout.
        </p>

        <OverviewCards onOpenModal={() => setIsModalOpen(true)} />
        <ActivityTable />
        <TeamTable />
        <WorkoutForm />
      </main>

      <AppModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

export default App;
