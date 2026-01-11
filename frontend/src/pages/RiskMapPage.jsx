import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import { getRiskColor, getRiskDotColor } from "../utils/riskHelpers";

const riskMap = {
  1: "Low",
  2: "Medium",
  3: "High",
};

const RiskMapPage = ({ userRole }) => {
  const [hotspots, setHotspots] = useState([]);
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [riskFilter, setRiskFilter] = useState("All");
  const [loading, setLoading] = useState(true);

  // Citizen report state (ONLY used if citizen)
  const [severity, setSeverity] = useState(3);
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch("https://drainsmart.onrender.com/api/hotspots")
      .then((res) => res.json())
      .then((data) => {
        const normalized = data.map((spot) => ({
          id: spot.id,
          name: spot.name,
          lat: spot.lat,
          lng: spot.lng,
          risk: riskMap[spot.risk_level],
        }));

        setHotspots(normalized);
        setSelectedHotspot(normalized[0] || null);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch hotspots", err);
        setLoading(false);
      });
  }, []);

  const filteredHotspots =
    riskFilter === "All"
      ? hotspots
      : hotspots.filter((spot) => spot.risk === riskFilter);

  const submitReport = async () => {
    if (!selectedHotspot) return;

    await fetch("https://drainsmart.onrender.com/api/reports", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hotspot_id: selectedHotspot.id,
        severity,
        description,
      }),
    });

    setSubmitted(true);
    setDescription("");
    setTimeout(() => setSubmitted(false), 3000);
  };

  if (loading) {
    return <Card>Loading risk map…</Card>;
  }

  return (
    <Card>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-6">
        Ward-wise Water-logging Risk Map
      </h2>

      {/* ================= FILTERS ================= */}
      <div className="flex gap-3 mb-4">
        {["All", "High", "Medium", "Low"].map((level) => (
          <button
            key={level}
            onClick={() => setRiskFilter(level)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition
              ${
                riskFilter === level
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700"
              }`}
          >
            {level}
          </button>
        ))}
      </div>

      {/* ================= MAIN LAYOUT ================= */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="relative md:col-span-3 h-[520px] min-h-[520px] rounded-lg overflow-hidden">
          <MapContainer center={[28.6139, 77.209]} zoom={10} className="h-full w-full">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {filteredHotspots.map((spot) => (
              <CircleMarker
                key={spot.id}
                center={[spot.lat, spot.lng]}
                radius={spot.id === selectedHotspot?.id ? 14 : 10}
                fillColor={
                  spot.risk === "High"
                    ? "#dc2626"
                    : spot.risk === "Medium"
                    ? "#f59e0b"
                    : "#16a34a"
                }
                fillOpacity={0.9}
                stroke={false}
                eventHandlers={{
                  click: () => setSelectedHotspot(spot),
                }}
              >
                <Tooltip>
                  <strong>{spot.name}</strong>
                  <br />
                  🚨 Risk: {spot.risk}
                </Tooltip>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>

        {/* ================= HOTSPOT LIST ================= */}
        <div className="space-y-3 max-h-[520px] overflow-y-auto">
          {filteredHotspots.map((spot) => (
            <button
              key={spot.id}
              onClick={() => setSelectedHotspot(spot)}
              className={`p-4 rounded-lg border-2 transition w-full text-left
                ${
                  selectedHotspot?.id === spot.id
                    ? "border-blue-600 bg-blue-50 dark:bg-slate-700"
                    : getRiskColor(spot.risk)
                }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`w-3 h-3 rounded-full ${getRiskDotColor(spot.risk)}`}
                />
                <span className="font-semibold">{spot.name}</span>
              </div>
              <p className="text-sm">Risk: {spot.risk}</p>
            </button>
          ))}
        </div>
      </div>

      {/* ================= DETAILS PANEL ================= */}
      {selectedHotspot && (
        <div className="mt-6 p-4 rounded-lg bg-slate-100 dark:bg-slate-700 space-y-3">
          <h3 className="font-semibold">{selectedHotspot.name}</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            🚨 Risk Level: {selectedHotspot.risk}
            <br />
            📍 Latitude: {selectedHotspot.lat}
            <br />
            📍 Longitude: {selectedHotspot.lng}
          </p>

          {/* ✅ Citizen-only reporting */}
          {userRole === "citizen" && (
            <>
              <hr />
              <h4 className="font-semibold">Report Water Logging</h4>

              <select
                value={severity}
                onChange={(e) => setSeverity(Number(e.target.value))}
                className="w-full border p-2 rounded"
              >
                <option value={1}>Low</option>
                <option value={2}>Medium</option>
                <option value={3}>High</option>
              </select>

              <textarea
                placeholder="Optional description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border p-2 rounded"
              />

              <button
                onClick={submitReport}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Submit Report
              </button>

              {submitted && (
                <p className="text-green-600 font-medium">
                  Report submitted successfully ✅
                </p>
              )}
            </>
          )}
        </div>
      )}
    </Card>
  );
};

export default RiskMapPage;

