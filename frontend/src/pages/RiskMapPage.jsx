import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import { useState } from "react";
import { wards } from "../data/wards";
import Card from "../components/Card";
import { getRiskColor, getRiskDotColor } from "../utils/riskHelpers";

const RiskMapPage = () => {
  const [selectedWard, setSelectedWard] = useState(wards[0]);
  const [riskFilter, setRiskFilter] = useState("All");

  const filteredWards =
    riskFilter === "All"
      ? wards
      : wards.filter((ward) => ward.risk === riskFilter);

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

        {/* ================= MAP SECTION ================= */}
        <div className="relative md:col-span-3 h-[520px] min-h-[520px] rounded-lg overflow-hidden">
          <MapContainer
            center={[28.6139, 77.209]}
            zoom={10}
            className="h-full w-full"
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {filteredWards.map((ward) => (
              <CircleMarker
                key={ward.id}
                center={[ward.lat, ward.lng]}
                radius={ward.id === selectedWard?.id ? 14 : 10}
                fillColor={
                  ward.risk === "High"
                    ? "#dc2626"
                    : ward.risk === "Medium"
                    ? "#f59e0b"
                    : "#16a34a"
                }
                fillOpacity={0.9}
                stroke={false}
                eventHandlers={{
                  click: () => setSelectedWard(ward),
                }}
              >
                <Tooltip>
                  <strong>{ward.name}</strong><br />
                  🚨 Risk: {ward.risk}<br />
                  🌧 Rainfall: {ward.rainfall} mm<br />
                  ⚠️ Vulnerable Areas: {ward.vulnerableAreas}
                </Tooltip>
              </CircleMarker>
            ))}
          </MapContainer>

          {/* ================= LEGEND ================= */}
          <div className="absolute bottom-4 right-4 bg-white dark:bg-slate-800 p-4 rounded-lg shadow border text-sm">
            <p className="font-semibold mb-2">Risk Levels</p>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-600" />
                High Risk
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-yellow-400" />
                Medium Risk
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-600" />
                Low Risk
              </div>
            </div>
          </div>
        </div>

        {/* ================= WARD LIST ================= */}
        <div className="space-y-3 max-h-[520px] overflow-y-auto">
          {filteredWards.map((ward) => (
            <button
              key={ward.id}
              onClick={() => setSelectedWard(ward)}
              className={`p-4 rounded-lg border-2 transition w-full text-left
                ${
                  selectedWard?.id === ward.id
                    ? "border-blue-600 bg-blue-50 dark:bg-slate-700"
                    : getRiskColor(ward.risk)
                }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`w-3 h-3 rounded-full ${getRiskDotColor(
                    ward.risk
                  )}`}
                />
                <span className="font-semibold">{ward.name}</span>
              </div>
              <p className="text-sm">
                Risk: {ward.risk} <br />
                {ward.vulnerableAreas} vulnerable areas
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* ================= DETAILS PANEL ================= */}
      {selectedWard && (
        <div className="mt-6 p-4 rounded-lg bg-slate-100 dark:bg-slate-700">
          <h3 className="font-semibold mb-1">
            {selectedWard.name} Ward
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            🚨 Risk Level: {selectedWard.risk} <br />
            🌧 Rainfall: {selectedWard.rainfall} mm <br />
            👥 Population: {selectedWard.population.toLocaleString()} <br />
            ⚠️ Vulnerable Areas: {selectedWard.vulnerableAreas}
          </p>
        </div>
      )}
    </Card>
  );
};

export default RiskMapPage;
