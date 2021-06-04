const express = require('express');
const router = express.Router();
const { check, body } = require('express-validator');

const { isAuth } = require('../middleware/auth');
const adminController = require('../controllers/admin');

router.get('/login', adminController.getLogin);

router.post('/login',
   body('username').isAlpha().withMessage('Username can only contain characters (not numbers & symbols)').isLength({ min: 5 }).withMessage('Username must be at least 5 characters long'),
   body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
   adminController.postLogin);

router.get('/logout', isAuth, adminController.getLogout);

router.get('/edit-landmark/:id', isAuth, adminController.getEdit);

router.post('/edit-landmark/:id',
   body('title').isLength({ min: 5, max: 50 }).withMessage('Title should consist of 5 - 50 characters'),
   body('short_info').notEmpty().withMessage('Short description cannot be empty'),
   body('description').notEmpty().withMessage('Description description cannot be empty'),
   isAuth, adminController.postEdit);

module.exports = router;