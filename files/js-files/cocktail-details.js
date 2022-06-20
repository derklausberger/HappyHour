
/*<h2>Mojito</h2>
        <img src="images/mojito.png" alt="Mojito Bild"><br>
        <input type="button" value="Like!"></input>
        <!-- Rezepte + Bilder über API laden -->
        <p>Description of Cocktail</p>
        <p>Ingredients: </p>
        <ul>
            <li>5cL rum</li>
            <li>6cL soda</li>
            <li>1 lime</li>
            <li>4 tbsp crushed ice</li>
            <li>2 tsp brown sugar</li>
            <li>fresh mint leaves</li>
        </ul>
        <p>How to: <br>
            Put ice into a glass and mix with mint leaves.<br>
            Crush together with sugar and limes. <br>
            Add rum and soda and top your drink with a fresh lime.
        </p>
        <p>Calculator for ... portions: </p>
        <ul>
            <li>1 bottle rum - 20</li>
            <li>1 bottle soda - 1</li>
            <li>1 net limes - 2</li>
            <li>handmade crushed ice - 0</li>
            <li>1 package brown sugar - 2</li>
            <li>mint leaves - 2</li>
        </ul>
        <p>Sum: 27€</p>
       
*/

function tausch() {
    document.getElementById("cocktailBtn").setAttribute("src", "/images/heartFull.jpg");
}
document.addEventListener("DOMContentLoaded", function (event) {
    let parser = new URLSearchParams(window.location.search);
    fetch('/api/cocktails/' + parser.get("id"))
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            return response.json();
        })
        .then(cocktail => {
            let c = cocktail.drinks[0];
            // heading
            let cocktailH2 = document.createElement("h2");
            cocktailH2.innerHTML = c.strDrink;
            cocktailH2.id = "cocktailH2";
            let heading = document.getElementById("heading");
            heading.prepend(cocktailH2);

            // picture
            let cockPic = document.createElement("img");
            cockPic.src = c.strDrinkThumb;
            cockPic.id = "cockPic";
            topLeft.appendChild(cockPic);

            // icon on button
            let icon = document.createElement("img");
            icon.src = "/images/heartEmpty.jpg";
            icon.id = "heart";
            let likeButton = document.createElement("button");
            likeButton.id = "likeButton";
            likeButton.append(icon);
            let bottom = document.getElementById("bottom");
            bottom.append(likeButton);

            // when clicked
            likeButton.onclick = tausch;

            // list of ingredients
            let ingredientsList = document.createElement("p");
            ingredientsList.id = "ingredientsList";
            let ingredientsTag = document.createElement("p");
            ingredientsTag.id = "ingredientsTag";
            ingredientsTag.innerHTML = "INGREDIENTS";
            ingredientsList.append(ingredientsTag);

            if(c.strIngredient1 !== null){
                let ingredient1 = document.createElement("li");
                if(c.strMeasure1 == null){
                    c.strMeasure1 = "";
                }
                ingredient1.innerHTML = c.strMeasure1 + " " + c.strIngredient1;
                ingredientsList.append(ingredient1);
            }
            
            if(c.strIngredient2 !== null){
                let ingredient2 = document.createElement("li");
                if(c.strMeasure2 == null){
                    c.strMeasure2 = "";
                }
                ingredient2.innerHTML = c.strMeasure2 + " " + c.strIngredient2;
                ingredientsList.append(ingredient2);
            }

            if(c.strIngredient3 !== null){
                let ingredient3 = document.createElement("li");
                if(c.strMeasure3 == null){
                    c.strMeasure3 = "";
                }
                ingredient3.innerHTML = c.strMeasure3 + " " + c.strIngredient3;
                ingredientsList.append(ingredient3);
            }

            if(c.strIngredient4 !== null){
                let ingredient4 = document.createElement("li");
                if(c.strMeasure4 == null){
                    c.strMeasure4 = "";
                }
                ingredient4.innerHTML = c.strMeasure4 + " " + c.strIngredient4;
                ingredientsList.append(ingredient4);
            }
            if(c.strIngredient5 !== null){
                let ingredient5 = document.createElement("li");
                if(c.strMeasure5 == null){
                    c.strMeasure5 = "";
                }
                ingredient5.innerHTML = c.strMeasure5 + " " + c.strIngredient5;
                ingredientsList.append(ingredient5);
            }
            if(c.strIngredient6 !== null){
                let ingredient6 = document.createElement("li");
                if(c.strMeasure6 == null){
                    c.strMeasure6 = "";
                }
                ingredient6.innerHTML = c.strMeasure6 + " " + c.strIngredient6;
                ingredientsList.append(ingredient6);
            }

            if(c.strIngredient7 !== null){
                let ingredient7 = document.createElement("li");
                if(c.strMeasure7 == null){
                    c.strMeasure7 = "";
                }
                ingredient7.innerHTML = c.strMeasure7 + " " + c.strIngredient7;
                ingredientsList.append(ingredient7);
            }
            if(c.strIngredient8 !== null){
                let ingredient8 = document.createElement("li");
                if(c.strMeasure8 == null){
                    c.strMeasure8 = "";
                }
                ingredient8.innerHTML = c.strMeasure8 + " " + c.strIngredient8;
                ingredientsList.append(ingredient8);
            }
            if(c.strIngredient9 !== null){
                let ingredient9 = document.createElement("li");
                if(c.strMeasure9 == null){
                    c.strMeasure9 = "";
                }
                ingredient9.innerHTML = c.strMeasure9 + " " + c.strIngredient9;
                ingredientsList.append(ingredient9);
            }
            if(c.strIngredient10 !== null){
                let ingredient10 = document.createElement("li");
                if(c.strMeasure10 == null){
                    c.strMeasure10 = "";
                }
                ingredient10.innerHTML = c.strMeasure10 + " " + c.strIngredient10;
                ingredientsList.append(ingredient10);
            }
            if(c.strIngredient11 !== null){
                let ingredient11 = document.createElement("li");
                if(c.strMeasure11 == null){
                    c.strMeasure11 = "";
                }
                ingredient11.innerHTML = c.strMeasure11 + " " + c.strIngredient11;
                ingredientsList.append(ingredient11);
            }
            if(c.strIngredient12 !== null){
                let ingredient12 = document.createElement("li");
                if(c.strMeasure12 == null){
                    c.strMeasure12 = "";
                }
                ingredient12.innerHTML = c.strMeasure12 + " " + c.strIngredient12;
                ingredientsList.append(ingredient12);
            }
            if(c.strIngredient13 !== null){
                let ingredient13 = document.createElement("li");
                if(c.strMeasure13 == null){
                    c.strMeasure13 = "";
                }
                ingredient13.innerHTML = c.strMeasure13 + " " + c.strIngredient13;
                ingredientsList.append(ingredient13);
            }
            if(c.strIngredient14 !== null){
                let ingredient14 = document.createElement("li");
                if(c.strMeasure14 == null){
                    c.strMeasure14 = "";
                }
                ingredient14.innerHTML = c.strMeasure14 + " " + c.strIngredient14;
                ingredientsList.append(ingredient14);
            }
            if(c.strIngredient15 !== null){
                let ingredient15 = document.createElement("li");
                if(c.strMeasure15 == null){
                    c.strMeasure15 = "";
                }
                ingredient15.innerHTML = c.strMeasure15 + " " + c.strIngredient15;
                ingredientsList.append(ingredient15);
            }

            let topRight = document.getElementById("topRight");
            topRight.append(ingredientsList);

            // instructions
            let instructionsDiv = document.createElement("p");
            instructionsDiv.id = "instructionsDiv";    
            let instructionsTag = document.createElement("p");
            instructionsTag.id = "instructionsTag";
            instructionsTag.innerHTML = "INSTRUCTIONS";
            instructionsDiv.append(instructionsTag);
            let instructions = c.strInstructions;
            instructionsDiv.append(instructions);
            bottom.append(instructionsDiv);
        }
        )
        .catch(err => console.error(`Fetch problem: ${err.message}`))
});
