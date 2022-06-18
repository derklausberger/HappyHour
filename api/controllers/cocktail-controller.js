const model = require("../models/cocktail-model");

class CocktailController {
    getCocktails = async (req, res) => {
        res.send(await model.getCocktails());
    }

    doLike = (req, res) => {
        res.send(model.like(req.session, req.body.id));
    }

    getLikes = (req, res) => {
        res.send(model.getLikes());
    }

    deleteLike = (req, res) => {
        res.send(model.deleteLike(req.body.id));
    }
}

module.exports = new CocktailController();