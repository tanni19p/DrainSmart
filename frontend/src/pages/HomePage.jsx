import {
  AlertCircle,
  MapPin,
  Shield,
  TrendingUp,
  ChevronRight,
  AlertTriangle
} from 'lucide-react';

const HomePage = ({ setActiveView }) => {
  return (
    <div className="space-y-8">

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-cyan-600 to-blue-700 text-white rounded-lg p-12">
        <div className="max-w-4xl">
          <h2 className="text-4xl font-bold mb-4">
            Proactive Water-logging Risk Management
          </h2>

          <p className="text-xl text-cyan-50 mb-6">
            MonsoonGuard uses GIS mapping and predictive analytics to identify
            water-logging hotspots across Delhi, enabling municipal authorities
            and citizens to prepare before the monsoon strikes.
          </p>

          <div className="flex gap-4">
            <button
              onClick={() => setActiveView('map')}
              className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:bg-cyan-50 transition-colors flex items-center gap-2"
            >
              View Risk Map <ChevronRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => setActiveView('citizen')}
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition-colors"
            >
              Citizen Portal
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border p-6">
          <MapPin className="w-8 h-8 text-cyan-600 mb-4" />
          <div className="text-3xl font-bold">8 Wards</div>
          <div className="text-sm text-gray-600">
            High Risk Areas Identified
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <AlertTriangle className="w-8 h-8 text-yellow-600 mb-4" />
          <div className="text-3xl font-bold">47 Locations</div>
          <div className="text-sm text-gray-600">
            Active Monitoring Points
          </div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <Shield className="w-8 h-8 text-green-600 mb-4" />
          <div className="text-3xl font-bold">92%</div>
          <div className="text-sm text-gray-600">
            Preparedness Score
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center gap-2 mb-2">
            <AlertCircle className="text-red-600" />
            <h3 className="font-bold">The Challenge</h3>
          </div>
          <p className="text-gray-700">
            Every monsoon season, Delhi experiences severe water-logging that
            disrupts daily life, damages infrastructure, and poses health risks.
          </p>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="text-blue-600" />
            <h3 className="font-bold">Our Approach</h3>
          </div>
          <p className="text-gray-700">
            MonsoonGuard combines historical data, drainage analysis, and rainfall
            predictions to enable proactive planning and early warnings.
          </p>
        </div>
      </div>

    </div>
  );
};

export default HomePage;
