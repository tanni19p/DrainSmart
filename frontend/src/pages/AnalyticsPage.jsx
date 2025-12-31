import Card from "../components/Card";

const AnalyticsPage = () => {
  const data = [
    { id: 1, name: "Najafgarh", count: 15, risk: "High" },
    { id: 2, name: "Karol Bagh", count: 12, risk: "High" },
    { id: 3, name: "East Delhi", count: 9, risk: "Medium" },
    { id: 4, name: "Civil Lines", count: 8, risk: "High" },
    { id: 5, name: "Shahdara", count: 7, risk: "Medium" },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100">
          Analytics Dashboard
        </h2>
        <p className="text-gray-600 dark:text-slate-300">
          Rainfall trends and ward-level vulnerability insights
        </p>
      </Card>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-4">
          Most Vulnerable Wards
        </h3>

        <div className="space-y-3">
          {data.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-4 rounded-lg bg-slate-100 dark:bg-slate-700"
            >
              <div>
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {item.count} vulnerable locations
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  item.risk === "High"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {item.risk}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AnalyticsPage;

