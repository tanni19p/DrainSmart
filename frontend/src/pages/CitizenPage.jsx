import { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

import AuthForm from "../components/AuthForm";
import Card from "../components/Card";
import { AlertTriangle, Phone, MapPin, Flag } from "lucide-react";

// 🔁 Same mapping as RiskMap
const riskMap = {
  1: "Low",
  2: "Medium",
  3: "High",
};

const CitizenPage = () => {
  /* ================= AUTH (UNCHANGED) ================= */
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setIsAuthenticated(!!session?.user);
      setLoading(false);
    };

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session?.user);
    });

    return () => subscription.unsubscribe();
  }, []);

  /* ================= HOTSPOTS (DB) ================= */
  const [hotspots, setHotspots] = useState([]);

  useEffect(() => {
    fetch("https://drainsmart.onrender.com/api/hotspots")
      .then((res) => res.json())
      .then((data) => {
        const normalized = data.map((spot) => ({
          id: spot.id,
          name: spot.name,
          risk: riskMap[spot.risk_level],
          rainfall: "—",              // optional placeholder
          vulnerableAreas: "—",        // optional placeholder
        }));

        setHotspots(normalized);
      })
      .catch((err) => {
        console.error("Failed to fetch citizen hotspots", err);
      });
  }, []);

  /* ================= STATE (UNCHANGED) ================= */
  const [savedWard, setSavedWard] = useState(
    localStorage.getItem("savedWard")
  );
  const [query, setQuery] = useState("");

  const [showReportForm, setShowReportForm] = useState(false);
  const [reportSent, setReportSent] = useState(false);
  const [report, setReport] = useState({
    location: "",
    severity: "High",
    description: "",
  });

  /* ================= DERIVED ================= */
  const selectedWard = savedWard
    ? hotspots.find((w) => w.name === savedWard) || null
    : null;

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <AuthForm
        role="Citizen"
        onAuthSuccess={() => setIsAuthenticated(true)}
      />
    );
  }

  const suggestions =
    query.length > 0
      ? hotspots.filter((w) =>
          w.name.toLowerCase().includes(query.toLowerCase())
        )
      : [];

  const handleSelectWard = (ward) => {
    setSavedWard(ward.name);
    localStorage.setItem("savedWard", ward.name);
    setQuery("");
  };

  const handleReportSubmit = () => {
    const reports =
      JSON.parse(localStorage.getItem("citizenReports")) || [];

    reports.push({
      ward: selectedWard.name,
      location: report.location,
      severity: report.severity,
      description: report.description,
      time: new Date().toISOString(),
    });

    localStorage.setItem(
      "citizenReports",
      JSON.stringify(reports)
    );

    setReport({ location: "", severity: "High", description: "" });
    setShowReportForm(false);
    setReportSent(true);

    setTimeout(() => setReportSent(false), 3000);
  };

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Citizen Portal</h2>
        <button
          onClick={async () => {
            await supabase.auth.signOut();
            localStorage.removeItem("savedWard");
            setIsAuthenticated(false);
          }}
          className="text-sm text-blue-600 dark:text-blue-400 underline"
        >
          Logout
        </button>
      </div>

      {/* SEARCH */}
      <Card>
        <input
          type="text"
          placeholder="Search your ward..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border dark:bg-gray-900"
        />

        {suggestions.length > 0 && (
          <div className="mt-3 space-y-2">
            {suggestions.map((ward) => (
              <button
                key={ward.id}
                onClick={() => handleSelectWard(ward)}
                className="block w-full text-left px-4 py-2 rounded-lg
                bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700"
              >
                {ward.name}
              </button>
            ))}
          </div>
        )}
      </Card>

      {!selectedWard && query.length === 0 && (
        <p className="text-sm text-slate-400 text-center">
          🔍 Search for your ward to view flood risk and safety information
        </p>
      )}

      {/* WARD DETAILS */}
      {selectedWard && (
        <Card>
          <h3 className="text-xl font-bold">{selectedWard.name}</h3>

          <p className="mt-2 font-semibold">
            Risk Level: {selectedWard.risk}
          </p>

          <div className="mt-6 grid md:grid-cols-3 gap-4">
            <button className="flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded">
              <Phone size={16} /> Emergency
            </button>

            <button className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded">
              <MapPin size={16} /> View on Map
            </button>

            <button
              onClick={() => setShowReportForm(true)}
              className="flex items-center justify-center gap-2 bg-yellow-600 text-white px-4 py-2 rounded"
            >
              <Flag size={16} /> Report Water-Logging
            </button>
          </div>

          {reportSent && (
            <p className="mt-4 text-green-500 text-sm">
              ✅ Report submitted successfully
            </p>
          )}

          <div className="mt-6">
            <h4 className="font-semibold flex items-center gap-2 mb-2">
              <AlertTriangle size={16} /> Safety Tips
            </h4>
            <ul className="list-disc list-inside text-sm space-y-1">
              {selectedWard.risk === "High" && (
                <>
                  <li>Avoid underpasses and flooded roads</li>
                  <li>Do not walk through moving water</li>
                </>
              )}
              {selectedWard.risk === "Medium" && (
                <>
                  <li>Monitor weather updates</li>
                  <li>Secure belongings near drains</li>
                </>
              )}
              {selectedWard.risk === "Low" && (
                <li>Stay alert during heavy rainfall</li>
              )}
            </ul>
          </div>
        </Card>
      )}

      {/* REPORT FORM */}
      {showReportForm && (
        <Card>
          <h3 className="text-lg font-semibold mb-4">
            🚨 Report Water-Logging
          </h3>

          <input
            placeholder="Location / Landmark"
            value={report.location}
            onChange={(e) =>
              setReport({ ...report, location: e.target.value })
            }
            className="w-full mb-3 px-3 py-2 rounded border"
          />

          <select
            value={report.severity}
            onChange={(e) =>
              setReport({ ...report, severity: e.target.value })
            }
            className="w-full mb-3 px-3 py-2 rounded border"
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <textarea
            placeholder="Describe the situation..."
            value={report.description}
            onChange={(e) =>
              setReport({ ...report, description: e.target.value })
            }
            className="w-full mb-4 px-3 py-2 rounded border"
          />

          <div className="flex gap-3">
            <button
              onClick={handleReportSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Submit Report
            </button>
            <button
              onClick={() => setShowReportForm(false)}
              className="text-sm underline"
            >
              Cancel
            </button>
          </div>
        </Card>
      )}
    </div>
  );
};

export default CitizenPage;

