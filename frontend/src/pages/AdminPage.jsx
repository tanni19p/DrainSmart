import { useEffect, useState } from "react";
import AuthForm from "../components/AuthForm";
import { Shield, CheckCircle } from "lucide-react";
import Card from "../components/Card";
import API_BASE_URL from "../config/api";

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const [wards, setWards] = useState([]);

  const [reports, setReports] = useState(() => {
    return JSON.parse(localStorage.getItem("citizenReports")) || [];
  });

  /* ---------------- FETCH WARDS ---------------- */
  useEffect(() => {
    if (!isAuthenticated) return;

    const token = localStorage.getItem("token");

    fetch(`${API_BASE_URL}/api/wards`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setWards(Array.isArray(data) ? data : []);
      })
      .catch(console.error);
  }, [isAuthenticated]);

  /* ---------------- AUTH ---------------- */
  if (!isAuthenticated) {
    return (
      <AuthForm
        role="Admin"
        onAuthSuccess={() => setIsAuthenticated(true)}
      />
    );
  }

  /* ---------------- KPI CALCULATIONS (SAFE) ---------------- */
  const totalWards = wards.length;

  const highRiskWards = wards.filter(
    (w) => w.riskLevel === "High"
  ).length;

  const totalHotspots = wards.reduce(
    (sum, w) => sum + (w.hotspots || 0),
    0
  );

  const priorityWards = wards.filter(
    (w) => w.isPriority
  ).length;

  /* ---------------- REPORT HANDLER ---------------- */
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
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
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
          <p className="text-2xl font-bold">{totalWards}</p>
        </Card>

        <Card>
          <p className="text-sm text-slate-400">High Risk Wards</p>
          <p className="text-2xl font-bold text-red-500">
            {highRiskWards}
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

      {/* WARD TABLE */}
      <Card>
        <h3 className="font-bold mb-4">Ward Risk Overview</h3>

        {wards.length === 0 ? (
          <p className="text-sm text-slate-400">
            No ward data available.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-2">Ward</th>
                <th className="pb-2">Risk</th>
                <th className="pb-2">Hotspots</th>
                <th className="pb-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {wards.map((ward, index) => (
                <tr
                  key={index}
                  className="border-b last:border-none"
                >
                  <td className="py-2">{ward.name}</td>
                  <td className="py-2">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        ward.riskLevel === "High"
                          ? "bg-red-500/20 text-red-400"
                          : ward.riskLevel === "Medium"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-green-500/20 text-green-400"
                      }`}
                    >
                      {ward.riskLevel || "Low"}
                    </span>
                  </td>
                  <td className="py-2">
                    {ward.hotspots || 0}
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
