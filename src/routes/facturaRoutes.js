const express = require("express");
const router = express.Router();
const facturaController = require("../controllers/facturaController");
const authAdminRegisMiddleware = require('../middleware/authAdminRegisMiddleware');
const uploadExcel = require("../middleware/facturaMiddleware");

router.post("/register", authAdminRegisMiddleware, uploadExcel, facturaController.importExcel);
router.post("/update", authAdminRegisMiddleware, uploadExcel, facturaController.updateFacturas);
router.get("/search-alls", authAdminRegisMiddleware, facturaController.getAllFacturas);
router.get("/search/:contrato", authAdminRegisMiddleware, facturaController.getFacturasByContrato);


module.exports = router;






