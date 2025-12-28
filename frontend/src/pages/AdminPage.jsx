import { Shield, AlertTriangle, CheckCircle } from "lucide-react";
import { wards } from "../data/wards";
import { getRiskColor } from "../utils/riskHelpers";

const AdminPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex items-center gap-3 mb-2">
          <Shield className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold">Municipal Admin Dashboard</h2>
        </div>
        <p className="text-gray-600">
          Decision-support tools for monsoon preparedness and response planning
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white border rounded-lg p-5">
          <div className="text-sm text-gray-600">Response Teams</div>
          <div className="text-3xl font-bold">24</div>
          <div className="text-xs text-green-600">Fully Deployed</div>
        </div>
        <div className="bg-white border rounded-lg p-5">
          <div className="text-sm text-gray-600">Pumping Stations</div>
          <div className="text-3xl font-bold">18</div>
          <div className="text-xs text-green-600">Operational</div>
        </div>
        <div className="bg-white border rounded-lg p-5">
          <div className="text-sm text-gray-600">Alerts Sent</div>
          <div className="text-3xl font-bold">142</div>
          <div className="text-xs text-gray-500">This Week</div>
        </div>
        <div className="bg-white border rounded-lg p-5">
          <div className="text-sm text-gray-600">Drain Capacity</div>
          <div className="text-3xl font-bold">87%</div>
          <div className="text-xs text-yellow-600">Needs Attention</div>
        </div>
      </div>

      {/* Ward Table */}
      <div className="bg-white rounded-lg border p-6">
        <h3 className="text-lg font-bold mb-4">
          Ward Risk Overview & Resource Allocation
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Ward</th>
                <th className="text-left py-2">Risk</th>
                <th className="text-left py-2">Hotspots</th>
                <th className="text-left py-2">Population</th>
                <th className="text-left py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {wards.map((ward) => (
                <tr key={ward.id} className="border-b hover:bg-gray-50">
                  <td className="py-2 font-medium">{ward.name}</td>
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
                  <td className="py-2">
                    {(ward.population / 1000).toFixed(0)}K
                  </td>
                  <td className="py-2">
                    {ward.risk === "High" ? (
                      <span className="flex items-center gap-1 text-green-600">
                        <CheckCircle className="w-4 h-4" /> Ready
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-yellow-600">
                        <AlertTriangle className="w-4 h-4" /> Monitoring
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
