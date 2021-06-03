const express = require('express');
const router = express.Router();

const axios = require('axios');

const { isAuth } = require('../middleware/auth');

router.get('/login', (req, res, next) => {
   if (req.session.loggedState) {
      res.status(301).redirect('/');
   }
   res.render('login');
});

router.post('/login', async (req, res, next) => {
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
      console.log(err);
      res.status(301).redirect('/admin/login');
   }
});

router.get('/logout', isAuth, (req, res, next) => {
   req.session.destroy();
   res.status(301).redirect('/');
});

router.get('/edit-landmark/:id', isAuth, async (req, res, next) => {
   const rawData = await axios.get('https://firefighter-5325.instashop.ae/api/landmarks/' + req.params.id);
   res.render('landmark-edit', {
      landmark: rawData.data
   });
});

router.post('/edit-landmark/:id', isAuth, async (req, res, next) => {
   try {
      const rawData = await axios.put('https://firefighter-5325.instashop.ae/api/landmarks/' + req.params.id, {
         title: req.body.title,
         short_info: req.body.short_info,
         description: req.body.description,
      }, {
            headers: {
               "content-type": "application/json",
               "Authorization": `Bearer ${req.session.loggedState.sessionToken.split(':')[1]}`
            }
      });
      res.status(301).redirect('/landmark/' + req.params.id);
   } catch (err) {
      if (err.response.status === 401) {
         return res.status(301).redirect('/landmark/' + req.params.id);
      }
      res.status(301).redirect('/');
   }

});

module.exports = router;