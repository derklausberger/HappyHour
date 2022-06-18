const model = require("../models/cocktail-model");

class CocktailController {
    getCocktails = async (req, res) => {
        res.send(await model.getCocktails());
    }

    getCocktail = async (req, res) => {
        console.log(req.params.id);
        res.send(await model.getCocktail(req.params.id));
    }
}

module.exports = new CocktailController();