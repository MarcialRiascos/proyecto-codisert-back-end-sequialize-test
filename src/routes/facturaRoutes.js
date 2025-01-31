const express = require("express");
const router = express.Router();
const facturaController = require("../controllers/facturaController");
const authAdminRegisMiddleware = require('../middleware/authAdminRegisMiddleware');
const uploadExcel = require("../middleware/facturaMiddleware");

router.post("/register", authAdminRegisMiddleware, uploadExcel, facturaController.importExcel);
router.post("/update", authAdminRegisMiddleware, uploadExcel, facturaController.updateFacturas);


module.exports = router;






