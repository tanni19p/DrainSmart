export function predictWardRisks(hotspots) {
  if (!hotspots || hotspots.length === 0) return [];

  const severityWeight = {
    High: 3,
    Medium: 2,
    Low: 1,
  };

  const wardStats = {};

  hotspots.forEach((h) => {
    if (!wardStats[h.name]) {
      wardStats[h.name] = {
        ward: h.name,
        score: 0,
        count: 0,
      };
    }

    wardStats[h.name].count += 1;
    wardStats[h.name].score += severityWeight[h.risk] || 1;
  });

  const wards = Object.values(wardStats);

  const avgScore =
    wards.reduce((sum, w) => sum + w.score, 0) / wards.length;

  return wards.map((w) => {
    let predictedRisk = "Low";

    if (w.score >= avgScore * 1.2) predictedRisk = "High";
    else if (w.score >= avgScore * 0.8) predictedRisk = "Medium";

    return {
      ward: w.ward,
      predictedRisk,
      score: w.score,
      hotspots: w.count,
      explanation: `Based on ${w.count} historical hotspots and severity-weighted risk score.`,
    };
  });
}