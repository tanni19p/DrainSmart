const { calculateRisk } = require("../services/risk.service");
const wards = require("../data/wards.json");

exports.getHotspots = (req, res) => {
  let summary = { low: 0, medium: 0, high: 0 };

  wards.forEach(w => {
    const { riskLevel } = calculateRisk(w);
    summary[riskLevel.toLowerCase()]++;
  });

  res.json(summary);
};
