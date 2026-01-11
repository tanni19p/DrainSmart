import { useState, useEffect } from "react";

import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";

import HomePage from "./pages/HomePage.jsx";
import RiskMapPage from "./pages/RiskMapPage.jsx";
import AnalyticsPage from "./pages/AnalyticsPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import CitizenPage from "./pages/CitizenPage.jsx";
import AboutPage from "./pages/AboutPage.jsx";

import { supabase } from "./supabaseClient.js";

const App = () => {
  const [activeView, setActiveView] = useState("home");
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔐 Restore session on refresh + listen to auth changes
  useEffect(() => {
    const loadSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.user) {
        setUser(session.user);
        setUserRole(session.user.user_metadata?.role || "citizen");
      } else {
        setUser(null);
        setUserRole(null);
      }

      setLoading(false);
    };

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        setUserRole(session.user.user_metadata?.role || "citizen");
        setActiveView("map");
      } else {
        setUser(null);
        setUserRole(null);
        setActiveView("home");
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = (user) => {
    setUser(user);
    setUserRole(user.user_metadata?.role || "citizen");
    setActiveView("map");
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setUserRole(null);
    setActiveView("home");
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

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

        {activeView === "map" && <RiskMapPage userRole={userRole} />}

        {activeView === "analytics" && <AnalyticsPage />}

        {activeView === "admin" &&
          (userRole === "admin" ? (
            <AdminPage />
          ) : (
            <div className="text-red-500 font-semibold">
              Access denied. Admins only.
            </div>
          ))}

        {activeView === "citizen" && (
          <CitizenPage onLogin={handleLogin} />
        )}

        {activeView === "about" && <AboutPage />}
      </main>

      <Footer setActiveView={setActiveView} />
    </div>
  );
};

export default App;