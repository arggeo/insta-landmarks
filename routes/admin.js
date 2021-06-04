const express = require('express');
const router = express.Router();

const { isAuth } = require('../middleware/auth');
const adminController = require('../controllers/admin');

router.get('/login', adminController.getLogin);

router.post('/login', adminController.postLogin);

router.get('/logout', isAuth, adminController.getLogout);

router.get('/edit-landmark/:id', isAuth, adminController.getEdit);

router.post('/edit-landmark/:id', isAuth, adminController.postEdit);

module.exports = router;