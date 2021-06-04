const axios = require('axios');

exports.getIndex = async (req, res, next) => {
   const rawData = await axios.get('https://firefighter-5325.instashop.ae/api/landmarks');
   res.render('index', {
      landmarks: rawData.data
   });
}

exports.getSingle = async (req, res, next) => {
   const rawData = await axios.get('https://firefighter-5325.instashop.ae/api/landmarks/' + req.params.id);
   res.render('landmark-single', {
      landmark: rawData.data
   });
}