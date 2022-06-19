const { Router } = require('express');
const controller = require('../controllers/user-controller');

const routes = Router();

routes.post('/register', controller.registerUser);

routes.post('/login', controller.loginUser);

module.exports = routes;