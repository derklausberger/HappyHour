const { Router } = require('express');
const controller = require('../controllers/bar-controller');

const routes = Router();

routes.get('/bars', controller.getBars);

routes.get('/bar/:id', controller.getBar);

module.exports = routes;