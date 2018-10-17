require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const checkForSession = require('./middlewares/checkForSession');
const swagController = require('./controllers/swag_controller');
const authController = require('./controllers/auth_controller');
const cartController = require('./controllers/cart_controller');
const searchController = require('./controllers/search_controller');

const app = express();
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(checkForSession);
app.use( express.static( `${__dirname}/build` ) );

//Swag Controller Endpoints
app.get('/api/swag', swagController.read);

//Auth Controller Endpoints
app.post('/api/login', authController.login);
app.post('/api/register', authController.register);
app.post('/api/signout', authController.signout);
app.get('/api/user', authController.getUser);

//Cart Controller Endpoints
app.post('/api/cart', cartController.add);
app.post('/api/cart/checkout', cartController.checkout);
app.delete('/api/cart/delete', cartController.delete);

//Search Controller Endpoints
app.get('/api/search', searchController.search);

const port = process.env.SERVER_PORT;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
})