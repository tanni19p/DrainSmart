const AboutPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-xl p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          About DrainSmart
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          System overview, methodology, and data-driven approach for urban
          water-logging risk management
        </p>
      </div>

      {/* Project Overview */}
      <section className="bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Project Overview
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          DrainSmart is a civic-tech platform designed to predict, visualize,
          and monitor urban water-logging risks across Delhi. The system
          integrates geospatial data, historical flood patterns, and rainfall
          insights to help municipal authorities take proactive decisions and
          enable citizens to stay informed during monsoon seasons.
        </p>
        <p className="mt-3 text-gray-700 dark:text-gray-300 leading-relaxed">
          By shifting from reactive response to predictive planning, DrainSmart
          aims to reduce infrastructure damage, improve emergency preparedness,
          and enhance public safety in flood-prone urban areas.
        </p>
      </section>

      {/* Why It Matters */}
      <section className="bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Why DrainSmart?
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
          <li>Recurring water-logging disrupts daily life and public transport</li>
          <li>Drainage infrastructure data is often fragmented and underutilized</li>
          <li>Citizens lack real-time, localized risk awareness</li>
          <li>Municipal planning is mostly reactive instead of predictive</li>
        </ul>
      </section>

      {/* Data Sources */}
      <section className="bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Data Sources
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-700 dark:text-gray-300">
          <li>India Meteorological Department (IMD) – rainfall data</li>
          <li>Municipal Corporation of Delhi – drainage & ward data</li>
          <li>Survey of India – topographical and spatial data</li>
          <li>Census of India – population density and land use</li>
        </ul>
        <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
          * Current implementation uses mock/sample datasets for demonstration.
        </p>
      </section>

      {/* Risk Scoring */}
      <section className="bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Risk Scoring Methodology
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border dark:border-slate-700">
            <p className="font-medium text-gray-900 dark:text-white">
              Historical Flooding Frequency
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Weight: 30%
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border dark:border-slate-700">
            <p className="font-medium text-gray-900 dark:text-white">
              Drainage Infrastructure Capacity
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Weight: 25%
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border dark:border-slate-700">
            <p className="font-medium text-gray-900 dark:text-white">
              Rainfall Intensity Prediction
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Weight: 25%
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border dark:border-slate-700">
            <p className="font-medium text-gray-900 dark:text-white">
              Population Density & Land Use
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Weight: 20%
            </p>
          </div>
        </div>
      </section>

      {/* System Architecture */}
      <section className="bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-xl p-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          System Architecture
        </h2>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          The platform follows a modular architecture with a React-based
          frontend for visualization, a Node.js backend for APIs and data
          handling, and a spatially-enabled database layer designed to support
          GIS operations and analytics workflows.
        </p>
      </section>

      {/* Disclaimer */}
      <section className="text-center text-sm text-gray-500 dark:text-gray-400">
        DrainSmart is a prototype developed for hackathon demonstration purposes.
        All data representations are illustrative.
      </section>
    </div>
  );
};

export default AboutPage;

