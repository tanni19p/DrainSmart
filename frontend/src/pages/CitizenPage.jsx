import { useState } from "react";
import AuthForm from "../components/AuthForm";
import { wards } from "../data/wards";

const CitizenPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [query, setQuery] = useState("");

  if (!isAuthenticated) {
    return (
      <AuthForm role="Citizen" onAuthSuccess={() => setIsAuthenticated(true)} />
    );
  }

  const foundWard = wards.find((w) =>
    w.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Citizen Portal</h2>
        <button
          onClick={() => setIsAuthenticated(false)}
          className="text-sm text-blue-600 dark:text-blue-400 underline"
        >
          Logout
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-6">
        <input
          type="text"
          placeholder="Search your ward..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="
            w-full px-4 py-3 rounded-lg border
            bg-white text-gray-900 placeholder-gray-400
            dark:bg-gray-900 dark:text-gray-100 dark:placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-blue-500
            "
        />
      </div>

      {foundWard && (
        <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-6">
          <h3 className="text-xl font-bold">{foundWard.name}</h3>
          <p>Risk Level: {foundWard.risk}</p>
          <p>Rainfall: {foundWard.rainfall}mm</p>
          <p>Hotspots: {foundWard.vulnerableAreas}</p>
        </div>
      )}
    </div>
  );
};

export default CitizenPage;
