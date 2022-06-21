const model = require("../models/cocktail-model");

class CocktailController {
    getCocktails = async (req, res) => {
        res.send(await model.getCocktails(req.body.letter));
    }

    getRandomCocktails = async (req, res) => {
        res.send(await model.getRandomCocktails());
    }

    getCocktail = async (req, res) => {
        res.send(await model.getCocktail(req.params.id));
    }

    getAllCocktails = async (req, res) => {
        res.send(await model.getAllCocktails());
    }
    
    doLike = (req, res) => {
        if (!req.session.user) {
            return res.status(401).send();
        }
        res.send(model.like(req.session.user, req.body.idDrink));
    }

    getLikes = (req, res) => {
        res.send(model.getLikes());
    }

    deleteLike = (req, res) => {
        if (!req.session.user) {
            return res.status(401).send();
        }
        res.send(model.deleteLike(req.session.user, req.body.idDrink));
    }

    writeComment = (req, res) => {
        res.send(model.comment(req.session.user, req.body.id, req.body.comment));
    }

    deleteComment = (req, res) => {
        res.send(model.deleteComment(req.body.id));
    }

    editComment = (req,res) => {
        res.send(model.editComment(req.body.id, req.body.comment, req.body.cocktailId, req.session.user));
    }
}

module.exports = new CocktailController();