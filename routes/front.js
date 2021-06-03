const express = require('express');
const router = express.Router();

const axios = require('axios');

router.get('/landmark/:id', async (req, res, next) => {
   const rawData = await axios.get('https://firefighter-5325.instashop.ae/api/landmarks/' + req.params.id);
   res.render('landmark-single', {
      landmark: rawData.data
   });
});

router.get('/', async (req, res, next) => {
   const rawData = await axios.get('https://firefighter-5325.instashop.ae/api/landmarks');
   res.render('index', {
      landmarks: rawData.data
   });
});

module.exports = router;