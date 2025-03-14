const express = require('express');
const authAdminRegisMiddleware = require('../middleware/authAdminRegisMiddleware');
const authAdminRegisLectMiddleware = require('../middleware/authAdminRegisLectMiddleware');
const UsarController = require('../controllers/registerBeneficiaryController');
const router = express.Router();

router.post('/register', authAdminRegisMiddleware, UsarController.registerBeneficiary);
router.get('/search-alls', authAdminRegisLectMiddleware, UsarController.getAllBeneficiaries);
router.get('/search/:id', authAdminRegisLectMiddleware, UsarController.getBeneficiaryById);
router.get('/search/beneficiary/:numeroDocumento', authAdminRegisLectMiddleware, UsarController.getBeneficiaryByNumeroDocumento);
router.post('/update-from-excel', authAdminRegisMiddleware, UsarController.updateBeneficiariosFromExcel);
router.post('/update-from-excel-cpe', authAdminRegisMiddleware, UsarController.updateBeneficiariosFromExcelCPE);
router.put('/update/:id', authAdminRegisMiddleware, UsarController.updateBeneficiary);
router.delete('/delete/:id', authAdminRegisMiddleware, UsarController.deleteBeneficiary);
router.get('/combined-documents/:id', authAdminRegisMiddleware, UsarController.getCombinedDocuments);

module.exports = router;  