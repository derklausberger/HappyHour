const { Router } = require('express');
const controller = require('../controllers/cocktail-controller');

const routes = Router();

routes.get('/cocktails', controller.getCocktails);

routes.get('/cocktails/:id', controller.getCocktail);

routes.post('/like', controller.doLike);

routes.get('/likes', controller.getLikes);

routes.delete('/deleteLike', controller.deleteLike);

routes.post('/comment', controller.writeComment);

routes.delete('/deleteComment', controller.deleteComment);

routes.put('/editComment', controller.editComment);

module.exports = routes;