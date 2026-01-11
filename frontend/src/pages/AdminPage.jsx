import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import AuthForm from "../components/AuthForm";
import { Shield, CheckCircle } from "lucide-react";
import Card from "../components/Card";

const riskMap = {
  1: "Low",
  2: "Medium",
  3: "High",
};

const AdminPage = () => {
  /* ================= AUTH ================= */
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setIsAuthenticated(!!session?.user);
      setLoading(false);
    };

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session?.user);
    });

    return () => subscription.unsubscribe();
  }, []);

  /* ================= HOTSPOTS (DB) ================= */
  const [hotspots, setHotspots] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) return;

    fetch("https://drainsmart.onrender.com/api/hotspots")
      .then((res) => res.json())
      .then((data) => setHotspots(data))
      .catch((err) =>
        console.error("Failed to fetch admin hotspots", err)
      );
  }, [isAuthenticated]);

  /* ================= REPORTS (LOCAL OK FOR PROTOTYPE) ================= */
  const [reports, setReports] = useState(() => {
    return JSON.parse(localStorage.getItem("citizenReports")) || [];
  });

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <AuthForm
        role="Admin"
        onAuthSuccess={() => setIsAuthenticated(true)}
      />
    );
  }

  /* ================= DERIVED ANALYTICS ================= */

  const totalHotspots = hotspots.length;

  const highRiskHotspots = hotspots.filter(
    (h) => h.risk_level === 3
  ).length;

  const uniqueWards = [
    ...new Set(hotspots.map((h) => h.name)),
  ];

  const priorityWards = uniqueWards.filter((name) =>
    hotspots.some(
      (h) => h.name === name && h.risk_level === 3
    )
  ).length;

  /* ================= REPORT HANDLER ================= */
  const handleResolveReport = (index) => {
    const updatedReports = reports.filter((_, i) => i !== index);
    setReports(updatedReports);
    localStorage.setItem(
      "citizenReports",
      JSON.stringify(updatedReports)
    );
  };

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold">
            Municipal Admin Dashboard
          </h2>
        </div>

        <button
          onClick={async () => {
            await supabase.auth.signOut();
            setIsAuthenticated(false);
          }}
          className="text-sm underline text-blue-600"
        >
          Logout
        </button>
      </div>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <p className="text-sm text-slate-400">Total Wards</p>
          <p className="text-2xl font-bold">
            {uniqueWards.length}
          </p>
        </Card>

        <Card>
          <p className="text-sm text-slate-400">High Risk Hotspots</p>
          <p className="text-2xl font-bold text-red-500">
            {highRiskHotspots}
          </p>
        </Card>

        <Card>
          <p className="text-sm text-slate-400">Total Hotspots</p>
          <p className="text-2xl font-bold">
            {totalHotspots}
          </p>
        </Card>

        <Card>
          <p className="text-sm text-slate-400">Priority Wards</p>
          <p className="text-2xl font-bold text-yellow-400">
            {priorityWards}
          </p>
        </Card>
      </div>

      {/* HOTSPOT TABLE */}
      <Card>
        <h3 className="font-bold mb-4">
          Hotspot Risk Overview
        </h3>

        {hotspots.length === 0 ? (
          <p className="text-sm text-slate-400">
            No hotspot data available.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-2">Location</th>
                <th className="pb-2">Risk</th>
                <th className="pb-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {hotspots.map((spot) => (
                <tr
                  key={spot.id}
                  className="border-b last:border-none"
                >
                  <td className="py-2">{spot.name}</td>
                  <td className="py-2">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        riskMap[spot.risk_level] === "High"
                          ? "bg-red-500/20 text-red-400"
                          : riskMap[spot.risk_level] === "Medium"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-green-500/20 text-green-400"
                      }`}
                    >
                      {riskMap[spot.risk_level]}
                    </span>
                  </td>
                  <td className="py-2">
                    <button className="text-xs px-3 py-1 rounded bg-slate-700 hover:bg-slate-600">
                      Flag
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      {/* CITIZEN REPORTS */}
      <Card>
        <h3 className="font-bold mb-4">
          🚨 Citizen Flood Reports
        </h3>

        {reports.length === 0 ? (
          <p className="text-sm text-slate-400">
            No active citizen reports.
          </p>
        ) : (
          <div className="space-y-4">
            {reports.map((report, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border bg-slate-50 dark:bg-slate-800"
              >
                <div className="flex justify-between">
                  <div>
                    <p className="font-semibold">
                      📍 {report.location}
                    </p>
                    <p className="text-sm">
                      Ward: {report.ward}
                    </p>
                    <p className="text-sm">
                      Severity: {report.severity}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      handleResolveReport(index)
                    }
                    className="flex items-center gap-1 text-green-600 text-sm"
                  >
                    <CheckCircle size={16} />
                    Resolve
                  </button>
                </div>

                {report.description && (
                  <p className="mt-2 text-sm">
                    📝 {report.description}
                  </p>
                )}

                <p className="mt-2 text-xs text-slate-400">
                  ⏱{" "}
                  {new Date(report.time).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default AdminPage;

