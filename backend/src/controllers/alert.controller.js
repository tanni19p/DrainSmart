const { calculateRisk } = require("../services/risk.service");
const wards = require("../data/wards.json");

exports.getAlerts = (req, res) => {
  const alerts = wards
    .map(w => {
      const { riskLevel, riskScore } = calculateRisk(w);
      return { ...w, riskLevel, riskScore };
    })
    .filter(w => w.riskScore >= 120)
    .map(w => ({
      ward: w.ward,
      message: "High water-logging risk expected due to rainfall and drainage conditions",
      severity: "High"
    }));

  res.json(alerts);
};
