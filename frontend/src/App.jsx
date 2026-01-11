import { useState, useEffect } from "react";

import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";

import HomePage from "./pages/HomePage.jsx";
import RiskMapPage from "./pages/RiskMapPage.jsx";
import AnalyticsPage from "./pages/AnalyticsPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import CitizenPage from "./pages/CitizenPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";

const App = () => {
  const [activeView, setActiveView] = useState("home");

  // ✅ SINGLE SOURCE OF TRUTH
  const [userRole, setUserRole] = useState(null); // "citizen" | "admin" | null

  // ✅ Restore role on refresh
  useEffect(() => {
    const savedRole = localStorage.getItem("userRole");
    if (savedRole) setUserRole(savedRole);
  }, []);

  const loginAs = (role) => {
    setUserRole(role);
    localStorage.setItem("userRole", role);
    setActiveView("map");
  };

  const logout = () => {
    setUserRole(null);
    localStorage.removeItem("userRole");
    setActiveView("home");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900">
      <NavBar
        activeView={activeView}
        setActiveView={setActiveView}
        userRole={userRole}
        logout={logout}
      />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeView === "home" && <HomePage setActiveView={setActiveView} />}

        {activeView === "map" && (
          <RiskMapPage userRole={userRole} />
        )}

        {activeView === "analytics" && <AnalyticsPage />}

        {activeView === "admin" && (
          <AdminPage onLogin={() => loginAs("admin")} />
        )}

        {activeView === "citizen" && (
          <CitizenPage onLogin={() => loginAs("citizen")} />
        )}

        {activeView === "about" && <AboutPage />}
      </main>

      <Footer setActiveView={setActiveView} />
    </div>
  );
};

export default App;
