const http = require('http');
const path = require('path');

const express = require('express');
const app = express();
const session = require('express-session');

const bodyParser = require('body-parser');
const axios = require('axios');

const frontRoutes = require('./routes/front');
const adminRoutes = require('./routes/admin');
const { dataTransfer } = require('./middleware/locals');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use(dataTransfer);

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use('/admin', adminRoutes);
app.use(frontRoutes);

app.use((req, res, next) => {
   res.render('404');
});

const server = http.createServer(app);
server.listen(3000);