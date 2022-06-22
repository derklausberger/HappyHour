const fetch = require("node-fetch");
const fs = require('fs');
const editJsonFile = require("edit-json-file");

class Cocktail {
    //constructor for cocktail
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

    //get all likes
    getLikes() {
        //open file
        var rawdata = fs.readFileSync("./files/db/likes.json");
        //parse file
        var likesJson = JSON.parse(rawdata);

        //for all cocktails in cocktail array
        this.cocktails.forEach(c => {
            //like array of cocktail get data form array corrisponding to cocktailid
            c.likes = likesJson[c.idDrink];

            //if likes is undefinded
            if (c.likes == undefined) {
                //make it an empty array
                c.likes = [];
            }
        });
    }

    //delete a like
    deleteLike(user, idDrink) {
        //open file to edit
        let file = editJsonFile(`./files/db/likes.json`);

        //like array becomes array from database
        let likes = file.get(idDrink);
        //if array not undefinded
        if (likes) {
            //index is index of array where username was found
            const index = likes.indexOf(user);
            //if bigger than -1 so if exists
            if (index > -1) {
                //delete part of array
                likes.splice(index, 1);
                //set adapted array as array in database
                file.set(idDrink, likes);
                //save file
                file.save();
            }
        }

        //return all likes from that drink
        return file.get(idDrink);
    }

    //do a like
    like(user, idDrink) {
        //open file to edit
        let file = editJsonFile(`./files/db/likes.json`);

        //if no like to this drink is there yet
        if (!file.get(idDrink)) {
            //create new array for cocktail and add user
            file.set(idDrink, [user]);
        } else {
            //else if array is already there and user is not in it
            if (file.get(idDrink).indexOf(user) < 0) {
                //append array with username
                file.append(idDrink, user);
            }
        }
        //save file
        file.save();

        //return all likes from that drink
        return file.get(idDrink);
    }

    //get Comments
    getComments() {
        //open file
        var rawdata = fs.readFileSync("./files/db/comments.json");
        //parse file
        var commentsJson = JSON.parse(rawdata);
       
        //for each cocktail in cocktail array
        this.cocktails.forEach(c => {
            //set comment array from data of database according to drinkId
            c.comments = commentsJson[c.idDrink];
            //if no comments are related to this cocktail
            if (c.comments == undefined) {
                //set comment array empty
                c.comments = [];
            }
        });
    }

    //write a comment
    comment(userId, idDrink, comment) {
        //open file to edit
        let file = editJsonFile(`./files/db/comments.json`);
        //if no comments to this drink exists
        if (!file.get(idDrink)) {
            //create new array for drink
            file.set(idDrink, []);
            //and set user and comment in it
            file.append(idDrink, [userId, comment]);
        } else {
            //else append array with user and comment
            file.append(idDrink, [userId, comment]);
        }
        //save file
        file.save();
        //return comments from drink
        return file.get(idDrink);
    }

    //delete a comment
    deleteComment(user, idDrink, comment1) {
        //open file to edit
        let file = editJsonFile(`./files/db/comments.json`);
        //get all comments to specific drink
        let comments = file.get(idDrink);
        //if comments not undefinde
        if (comments) {
            //as long as comment array goes
            for (let i = 0; i < comments.length; i++){
                //if some entry matches user and comment to delete
                if (comments[i][0] == user && comments[i][1] == comment1){
                    //delte element at that index
                    comments.splice(i, 1);
                    //set database array as modified array
                    file.set(idDrink, comments);
                    //save
                    file.save();
                    //break
                    break;
                } 
            }
        }
        //return comments to specific drink
        return file.get(idDrink);
    }

    //edit a comment
    editComment(comment, idDrink, user, commentOld) {
        //delete old comment
        this.deleteComment(user, idDrink, commentOld);
        //open file to edit
        let file = editJsonFile(`./files/db/comments.json`);
        //append drink to user and new comment
        file.append(idDrink, [user, comment]);
        //save
        file.save();
        //return comments to specific drink
        return file.get(idDrink);
    }

    //load cocktails for specific letter from api
    async loadCocktails(letter) {
        try {
            const response = await fetch('http://www.thecocktaildb.com/api/json/v1/1/search.php?f=' + letter);

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            return await response.json();
        } catch (err) {
            console.error(`xFetch problem: ${err.message}`);
        }
    }

    //get cocktails for specific letter
    async getCocktails(letter) {
        try {
            this.cocktails = [];
            await this.loadCocktails(letter).then(cocktails_json => {
                if (cocktails_json.drinks != undefined) {
                    for (const c of Array.from(cocktails_json.drinks)) {
                        this.cocktails.push(Object.assign(new Cocktail, c));
                    };
                }
            }).catch(err => console.error(`Fetch problem: ${err.message}`));

            this.getLikes();
            this.getComments();
            return this.cocktails;
        } catch (err) {
            console.error(err);
        }
    }

    //load random cocktail
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

    //get 10 random cocktails
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

    //load cocktail form specific id
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

    //get cocktail with specific id
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

    //get all cocktails
    async getAllCocktails() {
        try {
            this.cocktails = [];
            for (let i = 0; i < 26; i++) {
                await this.loadCocktails(String.fromCharCode(i + 97)).then(cocktails_json => {
                    if (cocktails_json.drinks != undefined) {
                        for (const c of Array.from(cocktails_json.drinks)) {
                            this.cocktails.push(Object.assign(new Cocktail, c));
                        }
                    }
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

module.exports = model;