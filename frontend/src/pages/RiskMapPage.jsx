import { useState } from 'react';
import { wards } from '../data/wards';
import { getRiskColor, getRiskDotColor } from '../utils/riskHelpers';

const RiskMapPage = () => {
  const [selectedWard, setSelectedWard] = useState(null);

  return (
    <div className="bg-white rounded-lg border p-6">
      <h2 className="text-2xl font-bold mb-4">
        Ward-wise Water-logging Risk Map
      </h2>

      <div className="flex gap-6">
        {/* Ward Grid */}
        <div className="flex-1 grid grid-cols-4 gap-3">
          {wards.map((ward) => (
            <button
              key={ward.id}
              onClick={() => setSelectedWard(ward)}
              className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${getRiskColor(
                ward.risk
              )}`}
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className={`w-3 h-3 rounded-full ${getRiskDotColor(
                    ward.risk
                  )}`}
                />
                <div className="font-bold text-sm">{ward.name}</div>
              </div>

              <div className="text-xs opacity-75">
                Risk: {ward.risk}
              </div>
              <div className="text-xs opacity-75">
                {ward.vulnerableAreas} hotspots
              </div>
            </button>
          ))}
        </div>

        {/* Ward Details */}
        {selectedWard && (
          <div className="w-80 bg-blue-50 rounded-lg p-4 border">
            <h3 className="font-bold mb-3">
              {selectedWard.name} Ward
            </h3>

            <div className="space-y-2 text-sm">
              <div>
                <span className="text-gray-600">Risk Level:</span>{' '}
                <span className="font-semibold">
                  {selectedWard.risk}
                </span>
              </div>

              <div>
                <span className="text-gray-600">Avg. Rainfall:</span>{' '}
                {selectedWard.rainfall}mm
              </div>

              <div>
                <span className="text-gray-600">Population:</span>{' '}
                {selectedWard.population.toLocaleString()}
              </div>

              <div>
                <span className="text-gray-600">Vulnerable Areas:</span>{' '}
                {selectedWard.vulnerableAreas}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RiskMapPage;
