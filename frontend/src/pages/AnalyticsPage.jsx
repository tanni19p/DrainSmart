import { wards } from '../data/wards';
import { getRiskColor } from '../utils/riskHelpers';

const AnalyticsPage = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <p className="text-gray-600">
          Rainfall trends and ward risk insights
        </p>
      </div>

      <div className="bg-white rounded-lg border p-6">
        <h3 className="font-bold mb-4">
          Most Vulnerable Wards
        </h3>

        <div className="space-y-3">
          {wards
            .sort((a, b) => b.vulnerableAreas - a.vulnerableAreas)
            .slice(0, 5)
            .map((ward, idx) => (
              <div
                key={ward.id}
                className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg"
              >
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <div className="font-semibold">{ward.name}</div>
                  <div className="text-sm text-gray-600">
                    {ward.vulnerableAreas} vulnerable locations
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${getRiskColor(
                    ward.risk
                  )}`}
                >
                  {ward.risk}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
