const { Router } = require('express');
const controller = require('../controllers/user-controller');

const routes = Router();

routes.post('/login', controller.loginUser);

routes.post('/register', controller.registerUser);

module.exports = routes;