import { useState } from "react";
import { AlertCircle, CheckCircle, Users } from "lucide-react";
import { wards } from "../data/wards";

const CitizenPage = () => {
  const [query, setQuery] = useState("");
  const foundWard = wards.find((w) =>
    w.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex items-center gap-3 mb-2">
          <Users className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold">Citizen Portal</h2>
        </div>
        <p className="text-gray-600">
          Check your ward’s water-logging risk and safety guidance
        </p>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg border p-6">
        <h3 className="font-bold mb-3">Find Your Ward</h3>
        <input
          type="text"
          placeholder="Enter ward name (e.g., Karol Bagh)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {foundWard && (
          <div className="mt-6 p-6 rounded-lg border bg-gray-50">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-8 h-8 text-blue-600 mt-1" />
              <div>
                <h4 className="text-xl font-bold mb-1">
                  {foundWard.name} Ward
                </h4>
                <p className="font-semibold mb-2">
                  Risk Level:{" "}
                  <span className="text-blue-700">{foundWard.risk}</span>
                </p>
                <p className="text-gray-700">
                  Expected Rainfall: {foundWard.rainfall}mm <br />
                  Vulnerable Areas: {foundWard.vulnerableAreas}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Safety Tips */}
      <div className="bg-white rounded-lg border p-6">
        <h3 className="font-bold mb-4">Safety Tips</h3>
        <ul className="space-y-3">
          {[
            "Avoid water-logged roads",
            "Keep emergency contacts handy",
            "Follow municipal alerts",
            "Protect documents in waterproof covers",
          ].map((tip, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
              <span className="text-gray-700">{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CitizenPage;
