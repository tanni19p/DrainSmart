const { calculateRisk } = require("../services/risk.service");

exports.getWards = (req, res) => {
    const wards = require("../data/wards.json");

    const enriched = wards.map(w => {
        const risk = calculateRisk(w);
        return { ...w, ...risk };
    });

    res.json(enriched);
};
