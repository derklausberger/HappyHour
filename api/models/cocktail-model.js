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
        this.likes = [];
        this.comments = [];
    }
}

class CocktailModel {
    static LIKE_ID = 0;
    static COMMENT_ID = 0;

    constructor() {
        this.cocktails = [];
    }

    addLikes(){
        var rawdata = fs.readFileSync("./files/db/likes.json");
        var likesJson = JSON.parse(rawdata);
        for (var i = 0; i < likesJson.likes.length; i++){
            CocktailModel.LIKE_ID++;
        }
    }

    getLikes(){
        var rawdata = fs.readFileSync("./files/db/likes.json");
        var likesJson = JSON.parse(rawdata);
        for (let j = 0; j < this.cocktails.length; j++){
            for (let i = 0; i < likesJson.likes.length; i++){
                if (likesJson.likes[i].cocktailId == this.cocktails[j].idDrink){
                    this.cocktails[j].likes.push(likesJson.likes[i]);
                }
            }
        }
    }

    deleteLike(likeId){
        let file = editJsonFile(`./files/db/likes.json`);
        file.unset("likes."+likeId+".userId");
        file.unset("likes."+likeId+".cocktailId");
        file.unset("likes."+likeId+".id");
        file.save();
    }

    like(userId, cocktailId){
        
            let file = editJsonFile(`./files/db/likes.json`);
            file.append("likes", {id: CocktailModel.LIKE_ID, userId: 1, cocktailId: cocktailId});
            file.save();
        
    }

    addComments(){
        var rawdata = fs.readFileSync("./files/db/comments.json");
        var commentsJson = JSON.parse(rawdata);
        for (var i = 0; i < commentsJson.comments.length; i++){
            CocktailModel.COMMENT_ID++;
        }
    }

    getComments(){
        var rawdata = fs.readFileSync("./files/db/comments.json");
        var commentsJson = JSON.parse(rawdata);
        for (let j = 0; j < this.cocktails.length; j++){
            for (let i = 0; i < commentsJson.comments.length; i++){
                if (commentsJson.comments[i].cocktailId == this.cocktails[j].idDrink){
                    this.cocktails[j].comments.push(commentsJson.comments[i]);
                }
            }
        }
    }

    comment(userId, cocktailId, comment){
        let file = editJsonFile(`./files/db/comments.json`);
        file.append("comments", {id: CocktailModel.COMMENT_ID, userId: 1, cocktailId: cocktailId, comment: comment});
        file.save();
    }

    deleteComment(commentId){
        let file = editJsonFile(`./files/db/comments.json`);
        file.unset("comments."+commentId+".userId");
        file.unset("comments."+commentId+".cocktailId");
        file.unset("comments."+commentId+".comment");
        file.unset("comments."+commentId+".id");
        file.save();
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
            this.getLikes();
            this.getComments;
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
model.addComments();

module.exports = model;