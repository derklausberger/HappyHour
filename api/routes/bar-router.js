const { Router } = require('express');
const controller = require('../controllers/bar-controller');

const routes = Router();

routes.post('/bars', controller.getBars);

routes.get('/bar/:id', controller.getBar);

module.exports = routes;