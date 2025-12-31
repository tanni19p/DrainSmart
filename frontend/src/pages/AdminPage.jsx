import { useEffect, useState } from "react";
import AuthForm from "../components/AuthForm";
import { Shield } from "lucide-react";
import { getRiskColor } from "../utils/riskHelpers";

const AdminPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const API = import.meta.env.VITE_API_URL;
  const [wards, setWards] = useState([]);

  useEffect(() => {
    if (!isAuthenticated) return;

    fetch(`${API}/api/wards`)
      .then((res) => res.json())
      .then(setWards)
      .catch(console.error);
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <AuthForm
        role="Admin"
        onAuthSuccess={() => setIsAuthenticated(true)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h2 className="text-2xl font-bold">Municipal Admin Dashboard</h2>
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

      <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-6">
        <h3 className="font-bold mb-4">Ward Risk Overview</h3>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">Ward</th>
              <th className="text-left py-2">Risk</th>
              <th className="text-left py-2">Hotspots</th>
            </tr>
          </thead>
          <tbody>
            {wards.map((ward) => (
              <tr key={ward.id} className="border-b">
                <td className="py-2">{ward.name}</td>
                <td className="py-2">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${getRiskColor(
                      ward.risk
                    )}`}
                  >
                    {ward.risk}
                  </span>
                </td>
                <td className="py-2">{ward.vulnerableAreas}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPage;

