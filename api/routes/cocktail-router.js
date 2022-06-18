const { Router } = require('express');
const controller = require('../controllers/cocktail-controller');

const routes = Router();

routes.get('/cocktails', controller.getCocktails);

routes.post('/like', controller.doLike);

routes.get('/likes', controller.getLikes);

routes.delete('/deleteLike', controller.deleteLike);

module.exports = routes;