const http = require('http');
const path = require('path');

const express = require('express');
const app = express();
const session = require('express-session');

const bodyParser = require('body-parser');
const csrf = require('csurf');
const helmet = require('helmet');
const compression = require('compression');

const frontRoutes = require('./routes/front');
const adminRoutes = require('./routes/admin');
const { dataTransfer } = require('./middleware/locals');

const csrfProtection = csrf();

app.use(helmet());
app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));
app.use(csrfProtection);
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