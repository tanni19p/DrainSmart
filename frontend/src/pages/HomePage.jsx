import { MapPin, AlertTriangle, Shield, ChevronRight } from "lucide-react";
import Card from "../components/Card";

const HomePage = ({ setActiveView }) => {
  return (
    <div className="space-y-10">
      {/* Hero */}
      <div className="rounded-2xl p-10 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <h1 className="text-4xl font-bold mb-4">
          Proactive Water-logging Risk Management
        </h1>
        <p className="max-w-3xl text-blue-100 mb-6">
          DrainSmart uses GIS mapping and predictive analytics to identify
          water-logging hotspots across Delhi, enabling proactive planning.
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => setActiveView("map")}
            className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold flex items-center gap-2"
          >
            View Risk Map <ChevronRight size={18} />
          </button>
          <button
            onClick={() => setActiveView("citizen")}
            className="border border-white px-6 py-3 rounded-lg font-semibold"
          >
            Citizen Portal
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <MapPin className="text-blue-500 mb-3" />
          <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-100">
            8 Wards
          </h3>
          <p className="text-gray-600 dark:text-slate-300">
            High Risk Areas Identified
          </p>
        </Card>

        <Card>
          <AlertTriangle className="text-yellow-500 mb-3" />
          <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-100">
            47 Locations
          </h3>
          <p className="text-gray-600 dark:text-slate-300">
            Active Monitoring Points
          </p>
        </Card>

        <Card>
          <Shield className="text-green-500 mb-3" />
          <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-100">
            92%
          </h3>
          <p className="text-gray-600 dark:text-slate-300">
            Preparedness Score
          </p>
        </Card>
      </div>

      {/* Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-2">
            The Challenge
          </h3>
          <p className="text-gray-600 dark:text-slate-300">
            Every monsoon season, Delhi experiences severe water-logging due to
            inadequate drainage planning and lack of ward-level risk assessment.
          </p>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-2">
            Our Approach
          </h3>
          <p className="text-gray-600 dark:text-slate-300">
            DrainSmart combines historical flood data, drainage analysis, and
            rainfall predictions to enable early warnings and smarter decisions.
          </p>
        </Card>
      </div>

      {/* Emergency Contacts */}
      <div className="mt-12">
        <div
          className="
      rounded-xl p-6
      bg-red-50 dark:bg-slate-900
      border border-slate-200 dark:border-slate-700
    "
        >
          {/* Header */}
          <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-2 flex items-center gap-2">
            🚨 Emergency Contacts
          </h2>

          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
            In case of severe water-logging or flooding, contact authorities
            immediately.
          </p>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <p className="text-slate-700 dark:text-slate-300 font-medium">
                Delhi Disaster Helpline
              </p>
              <p className="mt-1 text-2xl font-bold text-red-600 dark:text-red-400">
                📞 1077
              </p>
            </div>

            <div className="rounded-lg p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <p className="text-slate-700 dark:text-slate-300 font-medium">
                Police
              </p>
              <p className="mt-1 text-2xl font-bold text-red-600 dark:text-red-400">
                🚓 112
              </p>
            </div>

            <div className="rounded-lg p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <p className="text-slate-700 dark:text-slate-300 font-medium">
                Ambulance
              </p>
              <p className="mt-1 text-2xl font-bold text-red-600 dark:text-red-400">
                🚑 108
              </p>
            </div>

            <div className="rounded-lg p-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <p className="text-slate-700 dark:text-slate-300 font-medium">
                Fire Services
              </p>
              <p className="mt-1 text-2xl font-bold text-red-600 dark:text-red-400">
                🚒 101
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
