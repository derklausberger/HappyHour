const fetch = require("node-fetch");

class Cocktail {
    constructor(idDrink, strDrink, strDrinkAlternate, strTags, strVideo,
        strCategory, strIBA, strAlcoholic, strGlass, strInstructions,
        strInstructionsES, strInstructionsDE, strInstructionsFR,
        strInstructionsIT, strInstructionsZH_HANS, strInstructionsZH_HANT,
        strDrinkThumb, strIngredient1, strIngredient2, strIngredient3,
        strIngredient4, strIngredient5, strIngredient6, strIngredient7,
        strIngredient8, strIngredient9, strIngredient10, strIngredient11,
        strIngredient12, strIngredient13, strIngredient14, strIngredient15,
        strMeasure1, strMeasure2, strMeasure3, strMeasure4, strMeasure5,
        strMeasure6, strMeasure7, strMeasure8, strMeasure9, strMeasure10,
        strMeasure11, strMeasure12, strMeasure13, strMeasure14, strMeasure15,
        strImageSource, strImageAttribution, strCreativeCommonsConfirmed,
        dateModified) {
        this.idDrink = idDrink;
        this.strDrink = strDrink;
        this.strDrinkThumb = strDrinkThumb;
        this.strCategory = strCategory;
    }
}

class CocktailModel {
    //static COCKTAIL_ID = 0;

    constructor() {
        this.cocktails = [];
    }

    /*addCocktail(cocktail) {
        cocktail.id = CocktailModel.COCKTAIL_ID++;
        this.cocktails.set(cocktail.id, cocktail);
    }*/

    async loadCocktails() {
        try {
            const response = await fetch('http://www.thecocktaildb.com/api/json/v1/1/search.php?f=a');

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            return await response.json();
        } catch (err) {
            console.log(`Fetch problem: ${err.message}`);
        }
    }

    async getCocktails() {
        try {
            await this.loadCocktails().then(cocktails_json => {
                this.cocktails = [];
                for (const c of Array.from(cocktails_json.drinks)) {
                    this.cocktails.push(Object.assign(new Cocktail, c));
                };
            });

            return this.cocktails;
        } catch (err) {
            console.log(error);
        }
    }

    async loadCocktail(id) {
        try {
            const response = await fetch('http://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + id);

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            return await response.json();
        } catch (err) {
            console.log(`Fetch problem: ${err.message}`);
        }
    }

    async getCocktail(id) {
        console.log("haha" + id);
        try {
            let cocktail;
            await this.loadCocktail(id).then(cocktail_json => {
                cocktail = cocktail_json;
                console.log(cocktail_json);
            });

            return cocktail;
        } catch (err) {
            console.log(error);
        }
    }
}

const model = new CocktailModel();

module.exports = model;