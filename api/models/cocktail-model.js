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
        this.likes = [];
        this.comments = [];
        this.liked = false;
    }
}

class CocktailModel {
    constructor() {
        this.cocktails = [Cocktail];
    }

    getLikes() {
        var rawdata = fs.readFileSync("./files/db/likes.json");
        var likesJson = JSON.parse(rawdata);

        this.cocktails.forEach(c => {
            c.likes = likesJson[c.idDrink];

            if (c.likes == undefined) {
                c.likes = [];
            }
        });
    }

    deleteLike(user, idDrink) {
        let file = editJsonFile(`./files/db/likes.json`);

        let likes = file.get(idDrink);
        if (likes) {
            const index = likes.indexOf(user);
            if (index > -1) {
                likes.splice(index, 1);
                file.set(idDrink, likes);
                file.save();
            }
        }

        return file.get(idDrink);
    }

    like(user, idDrink) {
        let file = editJsonFile(`./files/db/likes.json`);

        if (!file.get(idDrink)) {
            file.set(idDrink, [user]);
        } else {
            if (file.get(idDrink).indexOf(user) < 0) {
                file.append(idDrink, user);
            }
        }
        file.save();

        return file.get(idDrink);
    }

    getComments() {
        var rawdata = fs.readFileSync("./files/db/comments.json");
        var commentsJson = JSON.parse(rawdata);
       
        this.cocktails.forEach(c => {
            c.comments = commentsJson[c.idDrink];
            if (c.comments == undefined) {
                c.comments = [];
            }
        });
    }

    comment(userId, idDrink, comment) {
        let file = editJsonFile(`./files/db/comments.json`);
        if (!file.get(idDrink)) {
            file.set(idDrink, []);
            file.append(idDrink, [userId, comment]);
        } else {
            file.append(idDrink, [userId, comment]);
        }
        file.save();
        return file.get(idDrink);
    }

    deleteComment(user, idDrink, comment1) {
        let file = editJsonFile(`./files/db/comments.json`);
        let comments = file.get(idDrink);
        if (comments) {
            for (let i = 0; i < comments.length; i++){
                if (comments[i][0] == user && comments[i][1] == comment1){
                    comments.splice(i, 1);
                    file.set(idDrink, comments);
                    file.save();
                    break;
                } 
            }
        }
        return file.get(idDrink);
    }

    editComment(comment, idDrink, user, commentOld) {
        this.deleteComment(user, idDrink, commentOld);
        let file = editJsonFile(`./files/db/comments.json`);
        file.append(idDrink, [user, comment]);
        file.save();
        return file.get(idDrink);
    }

    /*addCocktail(cocktail) {
        cocktail.id = CocktailModel.COCKTAIL_ID++;
        this.cocktails.set(cocktail.id, cocktail);
    }*/

    async loadCocktails(letter) {
        try {
            const response = await fetch('http://www.thecocktaildb.com/api/json/v1/1/search.php?f=' + letter);

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            return await response.json();
        } catch (err) {
            console.error(`Fetch problem: ${err.message}`);
        }
    }

    async getCocktails(letter) {
        try {
            this.cocktails = [];
            await this.loadCocktails(letter).then(cocktails_json => {
                for (const c of Array.from(cocktails_json.drinks)) {
                    this.cocktails.push(Object.assign(new Cocktail, c));
                };
            }).catch(err => console.error(`Fetch problem: ${err.message}`));

            this.getLikes();
            this.getComments();
            return this.cocktails;
        } catch (err) {
            console.error(err);
        }
    }

    async loadRandomCocktails() {
        try {
            const response = await fetch('http://www.thecocktaildb.com/api/json/v1/1/random.php');

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            return await response.json();
        } catch (err) {
            console.error(`Fetch problem: ${err.message}`);
        }
    }

    async getRandomCocktails() {
        try {
            this.cocktails = [];

            for (let i = 0; i < 10; i++) {
                await this.loadRandomCocktails().then(cocktails_json => {
                    for (const c of Array.from(cocktails_json.drinks)) {
                        this.cocktails.push(Object.assign(new Cocktail, c));
                    };
                }).catch(err => console.error(`Fetch problem: ${err.message}`));
            }

            this.getLikes();
            this.getComments();
            return this.cocktails;
        } catch (err) {
            console.error(err);
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
            console.error(`Fetch problem: ${err.message}`);
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
            console.error(err);
        }
    }

    async getAllCocktails() {
        try {
            this.cocktails = [];
            for(let i = 0; i < 26; i++){
                await this.loadCocktails(String.fromCharCode(i + 97)).then(cocktails_json => {
                    for (const c of Array.from(cocktails_json.drinks)) {
                        this.cocktails.push(Object.assign(new Cocktail, c));
                    };
                }).catch(err => console.error(`Fetch problem: ${err.message}`));
            } 
            this.getLikes();
            this.getComments();
            return this.cocktails;
        } catch (err) {
            console.error(err);
        }
    }
}

const model = new CocktailModel();
//model.addLikes();
//model.addComments();

module.exports = model;