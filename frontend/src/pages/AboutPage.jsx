const AboutPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-0 pb-8 space-y-8">

      {/* HERO */}
      <section className="text-center space-y-3">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white">
          DrainSmart
        </h1>

        <p className="text-gray-600 dark:text-gray-300">
          Predict · Prepare · Protect
        </p>

        <p className="max-w-3xl mx-auto text-sm text-gray-600 dark:text-gray-400">
          A data-driven civic-tech platform enabling proactive urban
          water-logging risk management for resilient cities.
        </p>

        <div className="flex justify-center gap-3 pt-2 flex-wrap">
          <span className="px-3 py-1 rounded-full bg-blue-600/10 text-blue-600 text-xs">
            Predictive Risk Mapping
          </span>
          <span className="px-3 py-1 rounded-full bg-green-600/10 text-green-600 text-xs">
            Citizen Reporting
          </span>
          <span className="px-3 py-1 rounded-full bg-yellow-600/10 text-yellow-600 text-xs">
            Municipal Decision Support
          </span>
        </div>
      </section>

      {/* PROJECT OVERVIEW */}
      <section className="-mt-4 bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-xl p-6 space-y-3">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Project Overview
        </h2>

        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          DrainSmart is a civic-tech platform designed to predict, visualize,
          and monitor urban water-logging risks across Delhi. It integrates
          geospatial data, historical flood patterns, and rainfall insights
          to support proactive municipal decision-making and keep citizens
          informed during monsoon seasons.
        </p>

        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
          By shifting from reactive response to predictive planning, DrainSmart
          aims to reduce infrastructure damage, improve emergency preparedness,
          and enhance public safety in flood-prone urban areas.
        </p>
      </section>

      {/* WHY IT MATTERS */}
      <section className="bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Why DrainSmart?
        </h2>

        <div className="grid sm:grid-cols-2 gap-3 text-sm text-gray-700 dark:text-gray-300">
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border dark:border-slate-700">
            Recurring water-logging disrupts daily life and public transport
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border dark:border-slate-700">
            Drainage infrastructure data is fragmented and underutilized
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border dark:border-slate-700">
            Citizens lack real-time, localized flood risk awareness
          </div>
          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border dark:border-slate-700">
            Municipal planning is reactive instead of predictive
          </div>
        </div>
      </section>

      {/* DATA SOURCES */}
      <section className="bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
          Data Sources
        </h2>

        <ul className="list-disc pl-5 space-y-1 text-sm text-gray-700 dark:text-gray-300">
          <li>India Meteorological Department (IMD) – rainfall data</li>
          <li>Municipal Corporation of Delhi – drainage & ward data</li>
          <li>Survey of India – topographical and spatial data</li>
          <li>Census of India – population density and land use</li>
        </ul>

        <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
          * Current implementation uses mock/sample datasets for demonstration.
        </p>
      </section>

      {/* RISK SCORING */}
      <section className="bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Risk Scoring Methodology
        </h2>

        <div className="grid sm:grid-cols-2 gap-3">
          {[
            ["Historical Flooding Frequency", "30%"],
            ["Drainage Infrastructure Capacity", "25%"],
            ["Rainfall Intensity Prediction", "25%"],
            ["Population Density & Land Use", "20%"],
          ].map(([title, weight]) => (
            <div
              key={title}
              className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border dark:border-slate-700"
            >
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {title}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Weight: {weight}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SYSTEM ARCHITECTURE */}
      <section className="bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          System Architecture
        </h2>

        <div className="grid sm:grid-cols-3 gap-3 text-sm text-gray-700 dark:text-gray-300">
          <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border dark:border-slate-700">
            <strong>Frontend</strong>
            <p className="mt-1">
              React, Tailwind CSS, GIS visualization, dashboards
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border dark:border-slate-700">
            <strong>Backend</strong>
            <p className="mt-1">
              Node.js, Express APIs, risk analysis logic
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border dark:border-slate-700">
            <strong>Database</strong>
            <p className="mt-1">
              PostgreSQL + PostGIS for spatial analytics
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="pt-2 text-center text-xs text-gray-500 dark:text-gray-400">
        Hackathon Prototype · Data shown is illustrative
      </footer>
    </div>
  );
};

export default AboutPage;
