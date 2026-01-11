export const getRiskColor = (risk) => {
  switch (risk) {
    case 'High': return 'bg-red-100 text-red-800 border-red-300';
    case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    case 'Low': return 'bg-green-100 text-green-800 border-green-300';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const getRiskDotColor = (risk) => {
  if (risk === "High") return "bg-red-600";
  if (risk === "Medium") return "bg-yellow-500";
  return "bg-green-600";
};


export const riskColor = (risk) => {
  if (risk === "High") return "#dc2626";
  if (risk === "Medium") return "#f59e0b";
  return "#16a34a";
};
