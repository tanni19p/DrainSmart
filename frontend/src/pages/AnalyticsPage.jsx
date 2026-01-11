import { useEffect, useState } from "react";
import Card from "../components/Card";

const riskMap = {
  1: "Low",
  2: "Medium",
  3: "High",
};

const AnalyticsPage = () => {
  const [hotspots, setHotspots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://drainsmart.onrender.com/api/hotspots")
      .then((res) => res.json())
      .then((data) => {
        const normalized = data.map((spot) => ({
          id: spot.id,
          name: spot.name,
          risk: riskMap[spot.risk_level],
        }));

        setHotspots(normalized);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch analytics hotspots", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Card>Loading analytics…</Card>;
  }

  // ---------- DERIVED ANALYTICS ----------
  const totalLocations = hotspots.length;

  const highRisk = hotspots.filter((h) => h.risk === "High");
  const mediumRisk = hotspots.filter((h) => h.risk === "Medium");
  const lowRisk = hotspots.filter((h) => h.risk === "Low");

  const MAX_VISIBLE = 10;
  const topHotspots = highRisk.slice(0, MAX_VISIBLE);

  return (
    <div className="space-y-8">

      {/* ================= HEADER ================= */}
      <Card>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100">
          Analytics Dashboard
        </h2>
        <p className="text-gray-600 dark:text-slate-300">
          Risk distribution and vulnerability insights derived from city-wide flood data
        </p>
      </Card>

      {/* ================= KPI SUMMARY ================= */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card>
          <p className="text-sm text-slate-400">Total Locations</p>
          <h3 className="text-3xl font-bold">{totalLocations}</h3>
        </Card>

        <Card>
          <p className="text-sm text-slate-400">High Risk</p>
          <h3 className="text-3xl font-bold text-red-400">
            {highRisk.length}
          </h3>
        </Card>

        <Card>
          <p className="text-sm text-slate-400">Medium Risk</p>
          <h3 className="text-3xl font-bold text-yellow-400">
            {mediumRisk.length}
          </h3>
        </Card>

        <Card>
          <p className="text-sm text-slate-400">Low Risk</p>
          <h3 className="text-3xl font-bold text-green-400">
            {lowRisk.length}
          </h3>
        </Card>
      </div>

      {/* ================= HIGH-RISK HOTSPOTS ================= */}
      <Card>
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-slate-100">
            High-Risk Hotspots
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Showing {topHotspots.length} of {highRisk.length} high-risk locations
          </p>
        </div>

        <div className="space-y-3">
          {topHotspots.map((loc) => (
            <div
              key={loc.id}
              className="flex items-center justify-between p-4 rounded-lg
                         bg-red-500/10 border border-red-500/20
                         hover:bg-red-500/15 transition"
            >
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span className="font-semibold">{loc.name}</span>
              </div>

              <span className="text-sm font-medium text-red-400">
                High Risk
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* ================= RISK DISTRIBUTION ================= */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-4">
          Risk Distribution Overview
        </h3>

        <div className="space-y-4">
          {[
            { label: "High Risk", count: highRisk.length, color: "bg-red-500" },
            { label: "Medium Risk", count: mediumRisk.length, color: "bg-yellow-400" },
            { label: "Low Risk", count: lowRisk.length, color: "bg-green-500" },
          ].map(({ label, count, color }) => (
            <div key={label}>
              <div className="flex justify-between text-sm mb-1">
                <span>{label}</span>
                <span>{Math.round((count / totalLocations) * 100)}%</span>
              </div>
              <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded">
                <div
                  className={`h-2 ${color} rounded`}
                  style={{ width: `${(count / totalLocations) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* ================= INSIGHT ================= */}
      <Card className="border-l-4 border-yellow-400">
        <p className="text-sm text-slate-300">
          ⚠️ <span className="font-semibold">Key Insight:</span>{" "}
          {highRisk.length} locations are classified as high risk, indicating
          concentrated infrastructure stress in specific urban zones rather than
          uniform city-wide flooding.
        </p>
      </Card>

    </div>
  );
};

export default AnalyticsPage;

