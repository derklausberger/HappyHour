const { Router } = require('express');
const controller = require('../controllers/user-controller');

const routes = Router();

routes.post('/login', controller.loginUser);

routes.post('/register', controller.registerUser);

routes.get('/getUser', controller.getUser);

routes.patch('/changePassword',controller.changePw);

module.exports = routes;