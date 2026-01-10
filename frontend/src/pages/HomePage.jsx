import { MapPin, AlertTriangle, Shield, ChevronRight } from "lucide-react";
import Card from "../components/Card";

const HomePage = ({ setActiveView }) => {
  return (
    <div className="space-y-12">
      {/* ================= HERO ================= */}
      <div
        className="relative overflow-hidden rounded-2xl p-6 md:p-8 min-h-[280px]
             bg-gradient-to-br from-blue-300 via-blue-200 to-indigo-200
             dark:from-slate-900 dark:via-blue-800 dark:to-indigo-900
             text-slate-900 dark:text-white
             ring-1 ring-slate-300 dark:ring-white/10"
      >
        {/* subtle background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,white,transparent_60%)] opacity-10"></div>

        {/* HERO CONTENT */}
        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
          {/* LEFT: Message */}
          <div>
            <h1
              className="text-3xl md:text-4xl font-semibold tracking-tight mb-2
                     text-slate-900 dark:text-white"
            >
              Report water-logging issues.
            </h1>

            <h2
              className="text-xl md:text-2xl font-medium mb-4
                     text-slate-700 dark:text-blue-100"
            >
              Help cities respond faster.
            </h2>

            <p
              className="max-w-lg mb-5 text-sm leading-relaxed
                    text-slate-700/90 dark:text-blue-100/80"
            >
              A civic platform for reporting and analyzing drainage issues using
              GIS-based risk mapping and predictive insights.
            </p>

            <div className="flex gap-3">
              {/* Primary CTA */}
              <button
                onClick={() => setActiveView("citizen")}
                className="bg-white text-blue-700 px-5 py-2.5 rounded-md font-medium
                     shadow-md hover:bg-blue-50 transition"
              >
                Report an Issue
              </button>

              {/* Secondary CTA */}
              <button
                onClick={() => setActiveView("map")}
                className="border border-blue-400 px-5 py-2.5 rounded-md font-medium
                     text-blue-700 hover:bg-blue-50
                     dark:border-white/40 dark:text-white/90 dark:hover:bg-white/10
                     transition"
              >
                View Risk Map
              </button>
            </div>
          </div>

          {/* RIGHT: Key Highlights */}
          <div className="hidden md:grid grid-cols-2 gap-4 text-sm">
            {[
              {
                title: "📍 GIS Risk Mapping",
                desc: "Ward-level flood risk visualization",
              },
              {
                title: "📊 Predictive Insights",
                desc: "Data-driven preparedness planning",
              },
              {
                title: "🧑 Citizens + Admin",
                desc: "Unified reporting & governance",
              },
              {
                title: "⏱ Fast Reporting",
                desc: "Submit issues in under 2 minutes",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-lg bg-white/90 p-4 shadow-sm
                     dark:bg-white/10"
              >
                <p className="font-semibold text-slate-900 dark:text-white">
                  {item.title}
                </p>
                <p className="mt-1 text-slate-600 dark:text-blue-100/70">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ================= STATS ================= */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="text-red-500" />
            <span className="text-sm font-medium text-gray-500">
              High Risk Wards
            </span>
          </div>

          <h3 className="text-3xl font-bold text-gray-900 dark:text-slate-100">
            8
          </h3>

          <div className="mt-3 h-1 w-full bg-gray-200 rounded">
            <div className="h-1 w-3/4 bg-red-500 rounded"></div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="text-yellow-500" />
            <span className="text-sm font-medium text-gray-500">
              Monitoring Locations
            </span>
          </div>

          <h3 className="text-3xl font-bold text-gray-900 dark:text-slate-100">
            47
          </h3>

          <div className="mt-3 h-1 w-full bg-gray-200 rounded">
            <div className="h-1 w-2/3 bg-yellow-400 rounded"></div>
          </div>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-2">
            <Shield className="text-green-500" />
            <span className="text-sm font-medium text-gray-500">
              Preparedness Score
            </span>
          </div>

          <h3 className="text-3xl font-bold text-gray-900 dark:text-slate-100">
            92%
          </h3>

          <div className="mt-3 h-1 w-full bg-gray-200 rounded">
            <div className="h-1 w-[92%] bg-green-500 rounded"></div>
          </div>
        </Card>
      </div>

      {/* ================= INFO ================= */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="border-l-4 border-red-500 bg-red-50 dark:bg-slate-900">
          <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-2">
            The Challenge
          </h3>
          <p className="text-gray-600 dark:text-slate-300">
            Every monsoon season, Delhi experiences severe water-logging due to
            inadequate drainage planning and lack of ward-level risk assessment.
          </p>
        </Card>

        <Card className="border-l-4 border-green-500 bg-green-50 dark:bg-slate-900">
          <h3 className="text-lg font-semibold text-green-700 dark:text-green-400 mb-2">
            Our Approach
          </h3>
          <p className="text-gray-600 dark:text-slate-300">
            DrainSmart combines historical flood data, drainage analysis, and
            rainfall predictions to enable early warnings and smarter decisions.
          </p>
        </Card>
      </div>

      {/* ================= EMERGENCY ================= */}
      <div className="rounded-xl p-6 bg-red-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
        <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-2">
          🚨 Emergency Contacts
        </h2>

        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
          In case of severe water-logging or flooding, contact authorities
          immediately.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <EmergencyItem
            title="Delhi Disaster Helpline"
            number="1077"
            icon="📞"
          />
          <EmergencyItem title="Police" number="112" icon="🚓" />
          <EmergencyItem title="Ambulance" number="108" icon="🚑" />
          <EmergencyItem title="Fire Services" number="101" icon="🚒" />
        </div>
      </div>
    </div>
  );
};

/* ================= Emergency Item ================= */
const EmergencyItem = ({ title, number, icon }) => (
  <a
    href={`tel:${number}`}
    className="rounded-lg p-4 bg-white dark:bg-slate-800
               border border-slate-200 dark:border-slate-700
               hover:shadow-md hover:scale-[1.02] transition block"
  >
    <p className="text-slate-700 dark:text-slate-300 font-medium">{title}</p>
    <p className="mt-1 text-2xl font-bold text-red-600 dark:text-red-400">
      {icon} {number}
    </p>
    <span className="text-xs text-slate-500">Tap to call</span>
  </a>
);

export default HomePage;
