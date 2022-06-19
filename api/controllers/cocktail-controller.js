const model = require("../models/cocktail-model");

class CocktailController {
    getCocktails = async (req, res) => {
        res.send(await model.getCocktails());
    }

    getCocktail = async (req, res) => {
        console.log(req.params.id);
        res.send(await model.getCocktail(req.params.id));
    }
    
    doLike = (req, res) => {
        res.send(model.like(req.body.userId, req.body.id));
    }

    getLikes = (req, res) => {
        res.send(model.getLikes());
    }

    deleteLike = (req, res) => {
        res.send(model.deleteLike(req.body.id));
    }

    writeComment = (req, res) => {
        res.send(model.comment(req.body.userId, req.body.id, req.body.comment));
    }

    deleteComment = (req, res) => {
        res.send(model.deleteComment(req.body.id));
    }

    editComment = (req,res) => {
        res.send(model.editComment(req.body.id, req.body.comment, req.body.cocktailId, req.body.userId));
    }
}

module.exports = new CocktailController();