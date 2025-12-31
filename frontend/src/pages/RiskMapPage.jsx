import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import { useState } from "react";
import { wards } from "../data/wards";
import Card from "../components/Card";
import { getRiskColor, getRiskDotColor } from "../utils/riskHelpers";

{console.log(wards)}


const RiskMapPage = () => {
  // Default selected ward
  const [selectedWard, setSelectedWard] = useState(wards[0]);

  return (
    <Card>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100 mb-6">
        Ward-wise Water-logging Risk Map
      </h2>

      {/* ================= MAIN LAYOUT ================= */}
      <div className="grid md:grid-cols-4 gap-6">

        {/* ================= MAP SECTION ================= */}
        <div className="md:col-span-3 h-[520px] rounded-lg overflow-hidden">
          <MapContainer
            center={[28.6139, 77.209]} // Delhi center
            zoom={10}
            className="h-full w-full"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {wards.map((ward) => (
              <CircleMarker
                key={ward.id}
                center={[ward.lat, ward.lng]}
                radius={10}
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
                  Risk: {ward.risk}<br />
                  Vulnerable Areas: {ward.vulnerableAreas}
                </Tooltip>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>

        {/* ================= WARD LIST ================= */}
        <div className="space-y-3">
          {wards.map((ward) => (
            <button
              key={ward.id}
              onClick={() => setSelectedWard(ward)}
              className={`p-4 rounded-lg border-2 ${getRiskColor(
                ward.risk
              )} transition w-full text-left`}
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
            Risk Level: {selectedWard.risk} <br />
            Rainfall: {selectedWard.rainfall} mm <br />
            Population: {selectedWard.population.toLocaleString()} <br />
            Vulnerable Areas: {selectedWard.vulnerableAreas}
          </p>
        </div>
      )}
    </Card>
  );
};

export default RiskMapPage;

