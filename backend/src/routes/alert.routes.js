const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const role = require("../middlewares/role.middleware");
const { getAlerts } = require("../controllers/alert.controller");

router.get("/", auth, role("admin"), getAlerts);

module.exports = router;

