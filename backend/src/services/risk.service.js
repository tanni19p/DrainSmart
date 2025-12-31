exports.calculateRisk = ({ rainfall, drainageScore, elevation }) => {
    const riskScore =
        rainfall * 0.5 +
        (1 - drainageScore) * 30 +
        (10 - elevation) * 2;

    let riskLevel = "Low";

    if (riskScore >= 140) {
        riskLevel = "High";
    } else if (riskScore >= 100) {
        riskLevel = "Medium";
    }


    return {
        riskScore: Math.round(riskScore),
        riskLevel
    };
};
