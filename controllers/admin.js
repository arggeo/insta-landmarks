const axios = require('axios');
const { validationResult } = require('express-validator');

exports.getLogin = (req, res, next) => {
   if (req.session.loggedState) {
      res.status(301).redirect('/');
   }
   res.render('login', {
      errors: []
   });
}

exports.postLogin = async (req, res, next) => {
   const errors = validationResult(req);

   if (!errors.isEmpty()) {
      return res.status(422).render('login', {
         errors: errors.array()
      });
   }

   try {
      const resp = await axios.post('https://firefighter-5325.instashop.ae/api/users/login', {
         "username": req.body.username,
         "password": req.body.password
      });
      req.session.loggedState = {
         loggedIn: true,
         username: req.body.username,
         userId: resp.data.userId,
         sessionToken: resp.data.sessionToken
      }
      res.status(301).redirect('/');
   } catch (err) {
      // console.log(err);
      res.status(301).redirect('/admin/login');
   }
}

exports.getLogout = (req, res, next) => {
   req.session.destroy();
   res.status(301).redirect('/');
}

exports.getEdit = async (req, res, next) => {
   try {
      const rawData = await axios.get('https://firefighter-5325.instashop.ae/api/landmarks/' + req.params.id);
      res.render('landmark-edit', {
         landmark: rawData.data,
         errors: []
      });
   } catch (err) {
      // console.log(err);
      res.status(301).redirect('/landmark/' + req.params.id);
   }

}

exports.postEdit = async (req, res, next) => {
   const errors = validationResult(req);

   if (!errors.isEmpty()) {
      const rawData = await axios.get('https://firefighter-5325.instashop.ae/api/landmarks/' + req.params.id);
      return res.status(422).render('landmark-edit', {
         landmark: rawData.data,
         errors: errors.array()
      });
   }

   try {
      const rawData = await axios.put('https://firefighter-5325.instashop.ae/api/landmarks/' + req.params.id, {
         title: req.body.title,
         short_info: req.body.short_info,
         description: req.body.description,
      });
      res.status(301).redirect('/landmark/' + req.params.id);
   } catch (err) {
      // console.log(err);
      if (err.response.status === 401) {
         return res.status(301).redirect('/landmark/' + req.params.id);
      }
      res.status(301).redirect('/');
   }
}