import { Info } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex items-center gap-3 mb-2">
          <Info className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold">About MonsoonGuard</h2>
        </div>
        <p className="text-gray-600">
          Methodology, data sources, and system overview
        </p>
      </div>

      {/* Overview */}
      <div className="bg-white rounded-lg border p-6">
        <h3 className="text-lg font-bold mb-3">Project Overview</h3>
        <p className="text-gray-700 leading-relaxed">
          MonsoonGuard is a civic-tech platform designed to tackle recurring
          urban water-logging in Delhi. By combining historical flood data,
          rainfall predictions, drainage capacity analysis, and GIS mapping,
          the system enables proactive decision-making for authorities and
          actionable insights for citizens.
        </p>
      </div>

      {/* Data Sources */}
      <div className="bg-white rounded-lg border p-6">
        <h3 className="text-lg font-bold mb-3">Data Sources</h3>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>India Meteorological Department (IMD)</li>
          <li>Municipal Corporation of Delhi</li>
          <li>Survey of India (Topographical Data)</li>
          <li>Census of India</li>
        </ul>
      </div>

      {/* Methodology */}
      <div className="bg-white rounded-lg border p-6">
        <h3 className="text-lg font-bold mb-3">Risk Scoring Methodology</h3>
        <ul className="space-y-2 text-gray-700">
          <li>• Historical flooding frequency (30%)</li>
          <li>• Drainage infrastructure capacity (25%)</li>
          <li>• Topographical vulnerability (25%)</li>
          <li>• Predicted rainfall intensity (20%)</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutPage;
