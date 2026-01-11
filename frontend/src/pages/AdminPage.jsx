import { useEffect, useState } from "react";
import AuthForm from "../components/AuthForm";
import Card from "../components/Card";
import { Shield } from "lucide-react";
import { getRiskColor } from "../utils/riskHelpers";
import API_BASE_URL from "../config/api";
import { wards as localWards } from "../data/wards";

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const [wards, setWards] = useState([]);
  const [priorityWards, setPriorityWards] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const token = localStorage.getItem("token");

    fetch(`${API_BASE_URL}/api/wards`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("API failed");
        return res.json();
      })
      .then((data) => {
        const isValidWardData =
          Array.isArray(data) &&
          data.length > 0 &&
          data[0]?.name &&
          typeof data[0]?.vulnerableAreas === "number" &&
          data[0]?.risk;

        if (isValidWardData) {
          setWards(data);
        } else {
          console.warn("Invalid API ward data, using local wards");
          setWards(localWards);
        }
      })
      .catch(() => {
        console.warn("API error, using local ward data");
        setWards(localWards);
      });
  }, [isAuthenticated]);

  const togglePriority = (id) => {
    setPriorityWards((prev) =>
      prev.includes(id)
        ? prev.filter((w) => w !== id)
        : [...prev, id]
    );
  };

  if (!isAuthenticated) {
    return (
      <AuthForm
        role="Admin"
        onAuthSuccess={() => setIsAuthenticated(true)}
      />
    );
  }

  const highRiskCount = wards.filter((w) => w.risk === "High").length;

  const totalHotspots = wards.reduce(
    (sum, w) => sum + (Number(w.vulnerableAreas) || 0),
    0
  );

  return (
    <div className="space-y-8">

      {/* ===== Header ===== */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
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
          className="text-sm text-blue-600 dark:text-blue-400 underline"
        >
          Logout
        </button>
      </div>

      {/* ===== KPI Cards ===== */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <p className="text-sm text-slate-400">Total Wards</p>
          <h3 className="text-2xl font-bold">{wards.length}</h3>
        </Card>

        <Card>
          <p className="text-sm text-slate-400">High Risk Wards</p>
          <h3 className="text-2xl font-bold text-red-400">
            {highRiskCount}
          </h3>
        </Card>

        <Card>
          <p className="text-sm text-slate-400">Total Hotspots</p>
          <h3 className="text-2xl font-bold">
            {totalHotspots}
          </h3>
        </Card>

        <Card>
          <p className="text-sm text-slate-400">Priority Wards</p>
          <h3 className="text-2xl font-bold text-yellow-400">
            {priorityWards.length}
          </h3>
        </Card>
      </div>

      {/* ===== Ward Table ===== */}
      <Card>
        <h3 className="font-bold mb-4">Ward Risk Overview</h3>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-600">
              <th className="text-left py-3">Ward</th>
              <th className="text-left">Risk</th>
              <th className="text-left">Hotspots</th>
              <th className="text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {wards.map((ward) => (
              <tr
                key={ward.id}
                className="border-b border-slate-700 hover:bg-slate-800 transition"
              >
                <td className="py-3 font-medium">
                  {ward.name}
                </td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getRiskColor(
                      ward.risk
                    )}`}
                  >
                    {ward.risk}
                  </span>
                </td>

                <td>{ward.vulnerableAreas}</td>

                <td>
                  <button
                    onClick={() => togglePriority(ward.id)}
                    className={`px-3 py-1 rounded text-xs font-medium ${
                      priorityWards.includes(ward.id)
                        ? "bg-red-600 text-white"
                        : "bg-slate-700 hover:bg-slate-600"
                    }`}
                  >
                    {priorityWards.includes(ward.id)
                      ? "Flagged"
                      : "Flag"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* ===== Admin Note ===== */}
      <Card className="border-l-4 border-blue-500">
        <p className="text-sm text-slate-300">
          📢 <span className="font-semibold">Admin Action:</span> Flagged wards
          can be prioritised for drainage cleanup, emergency response, and
          citizen alerts during heavy rainfall.
        </p>
      </Card>

    </div>
  );
};

export default AdminPage;
