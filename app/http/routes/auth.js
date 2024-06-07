const express = require('express');
const router = express.Router();
const validateAdmin = require('../../http/middlewares/registerAdminValidator')
const authController = require('../controllers/authenticationController');

router.post('/api/register/admin', validateAdmin, authController.createNewAdmin);

module.exports = router;
