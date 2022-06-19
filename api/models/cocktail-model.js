const fetch = require("node-fetch");
const fs = require('fs');
const editJsonFile = require("edit-json-file");

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
        this.likes = 0;
        this.liked = false;
        this.likeArray = [];
        this.strInstructions = strInstructions;
        this.strIngredient1 = strIngredient1;
        this.strIngredient2 = strIngredient2;
        this.strIngredient3 = strIngredient3;
        this.strIngredient4 = strIngredient4;
        this.strIngredient5 = strIngredient5;
        this.strIngredient6 = strIngredient6;
        this.strIngredient7 = strIngredient7;
        this.strIngredient8 = strIngredient8;
        this.strIngredient9 = strIngredient9;
        this.strIngredient10 = strIngredient10;
        this.strIngredient11 = strIngredient11;
        this.strIngredient12 = strIngredient12;
        this.strIngredient13 = strIngredient13;
        this.strIngredient14 = strIngredient14;
        this.strIngredient15 = strIngredient15;
        this.strMeasure1 = strMeasure1;
        this.strMeasure2 = strMeasure2;
        this.strMeasure3 = strMeasure3;
        this.strMeasure4 = strMeasure4;
        this.strMeasure5 = strMeasure5;
        this.strMeasure6 = strMeasure6;
        this.strMeasure7 = strMeasure7;
        this.strMeasure8 = strMeasure8;
        this.strMeasure9 = strMeasure9;
        this.strMeasure10 = strMeasure10;
        this.strMeasure11 = strMeasure11;
        this.strMeasure12 = strMeasure12;
        this.strMeasure13 = strMeasure13;
        this.strMeasure14 = strMeasure14;
        this.strMeasure15 = strMeasure15;
        
    }
}

class CocktailModel {
    static LIKE_ID = 0;

    constructor() {
        this.cocktails = [];
    }

    addLikes(){
        var rawdata = fs.readFileSync("./files/db/likes.json");
        var usersJson = JSON.parse(rawdata);
        for (var i = 0; i < usersJson.likes.length; i++){
            CocktailModel.LIKE_ID++;
        }
    }

    checkLikes(userId, cocktailId){
        var liked = false;
        var rawdata = fs.readFileSync("./files/db/likes.json");
        var usersJson = JSON.parse(rawdata);
        for (var i = 0; i < usersJson.likes.length; i++){
            if (usersJson.likes[i].userId == userId && usersJson.likes[i].cocktailId == cocktailId){
                liked = true;
                break;
            }
        }
        return liked;
    }

    getLikes(){
        var rawdata = fs.readFileSync("./files/db/likes.json");
        var usersJson = JSON.parse(rawdata);
        for (let j = 0; j < this.cocktails.length; j++){
            for (let i = 0; i < usersJson.likes.length; i++){
                if (usersJson.likes[i].cocktailId == this.cocktails[j].idDrink){
                    this.cocktails[j].likeArray.push(usersJson.likes[i]);
                    this.cocktails[j].likes++;
                    this.cocktails[j].liked = true;
                }
            }
        }
    }

    deleteLike(likeId){
        console.log(likeId);
        let file = editJsonFile(`./files/db/likes.json`);
        file.unset("likes."+likeId+".userId");
        file.unset("likes."+likeId+".cocktailId");
        file.unset("likes."+likeId+".id");
        file.save();
    }

    like(userId, cocktailId){
        if(this.checkLikes(1, cocktailId) == false ){
            let file = editJsonFile(`./files/db/likes.json`);
            file.append("likes", {id: CocktailModel.LIKE_ID, userId: 1, cocktailId: cocktailId});
            file.save();
        }
    }
    
    /*addCocktail(cocktail) {
        cocktail.id = CocktailModel.COCKTAIL_ID++;
        this.cocktails.set(cocktail.id, cocktail);
    }*/

    async loadCocktails(/*letter*/) {
        try {
            const response = await fetch('http://www.thecocktaildb.com/api/json/v1/1/search.php?f=a' /*+ letter*/);

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
            this.cocktails = [];
            //for(let i = 0; i < 26; i++){
                await this.loadCocktails(/*String.fromCharCode(i + 97)*/).then(cocktails_json => {
                    for (const c of Array.from(cocktails_json.drinks)) {
                        this.cocktails.push(Object.assign(new Cocktail, c));
                    };
                }).catch(err => console.error(`Fetch problem: ${err.message}`));
           // } 
            
            this.getLikes();
            return this.cocktails;
        } catch (err) {
            console.log(err);
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
        try {
            let cocktail;
            await this.loadCocktail(id).then(cocktail_json => {
                cocktail = cocktail_json;
            });

            return cocktail;
        } catch (err) {
            console.log(error);
        }
    }
}

const model = new CocktailModel();
model.addLikes();

module.exports = model;