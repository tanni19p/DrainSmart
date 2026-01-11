import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { useState } from "react";
import Card from "../components/Card";
import MapClickHandler from "../components/MapClickHandler";
import ReportForm from "../components/ReportForm";

const CitizenMapPage = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [success, setSuccess] = useState(false);

  const submitReport = async (payload) => {
    try {
      await fetch("https://drainsmart.onrender.com/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      setSelectedLocation(null);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to submit report", err);
    }
  };

  return (
    <Card>
      <h2 className="text-2xl font-bold mb-4">
        Report Waterlogging
      </h2>

      <div className="h-[520px] rounded-lg overflow-hidden">
        <MapContainer
          center={[28.6139, 77.209]}
          zoom={11}
          className="h-full w-full"
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <MapClickHandler onSelect={setSelectedLocation} />

          {selectedLocation && (
            <Marker
              position={[
                selectedLocation.lat,
                selectedLocation.lng,
              ]}
            />
          )}
        </MapContainer>
      </div>

      {selectedLocation && (
        <div className="mt-4">
          <ReportForm
            location={selectedLocation}
            onSubmit={submitReport}
            onCancel={() => setSelectedLocation(null)}
          />
        </div>
      )}

      {success && (
        <p className="mt-3 text-green-600 font-medium">
          Report submitted successfully ✅
        </p>
      )}
    </Card>
  );
};

export default CitizenMapPage;
