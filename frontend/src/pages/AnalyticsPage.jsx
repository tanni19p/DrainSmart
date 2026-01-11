import Card from "../components/Card";
import { wards } from "../data/wards";

const AnalyticsPage = () => {
  // ---------- DERIVED ANALYTICS ----------
  const totalLocations = wards.length;

  const highRisk = wards.filter(w => w.risk === "High");
  const mediumRisk = wards.filter(w => w.risk === "Medium");
  const lowRisk = wards.filter(w => w.risk === "Low");

  // Top high-risk hotspots (limit for readability)
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
          {topHotspots.map((loc, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 rounded-lg
                         bg-red-500/10 border border-red-500/20
                         hover:bg-red-500/15 transition"
            >
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span className="font-semibold">
                  {loc.name}
                </span>
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
          {/* High */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>High Risk</span>
              <span>{Math.round((highRisk.length / totalLocations) * 100)}%</span>
            </div>
            <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded">
              <div
                className="h-2 bg-red-500 rounded"
                style={{ width: `${(highRisk.length / totalLocations) * 100}%` }}
              />
            </div>
          </div>

          {/* Medium */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Medium Risk</span>
              <span>{Math.round((mediumRisk.length / totalLocations) * 100)}%</span>
            </div>
            <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded">
              <div
                className="h-2 bg-yellow-400 rounded"
                style={{ width: `${(mediumRisk.length / totalLocations) * 100}%` }}
              />
            </div>
          </div>

          {/* Low */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Low Risk</span>
              <span>{Math.round((lowRisk.length / totalLocations) * 100)}%</span>
            </div>
            <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded">
              <div
                className="h-2 bg-green-500 rounded"
                style={{ width: `${(lowRisk.length / totalLocations) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* ================= INSIGHT ================= */}
      <Card className="border-l-4 border-yellow-400">
        <p className="text-sm text-slate-300">
          ⚠️ <span className="font-semibold">Key Insight:</span>  
          {highRisk.length} locations are classified as high risk, with a strong
          concentration around underpasses, arterial roads, and drainage crossings.
          This suggests infrastructure bottlenecks as the primary contributors
          rather than widespread residential flooding.
        </p>
      </Card>

    </div>
  );
};

export default AnalyticsPage;
