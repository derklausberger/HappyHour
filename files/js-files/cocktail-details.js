
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

            // list of ingredients
            let ingredientsList = document.createElement("p");
            ingredientsList.id = "ingredientsList";
            let ingredientsTag = document.createElement("p");
            ingredientsTag.id = "ingredientsTag";
            ingredientsTag.innerHTML = "INGREDIENTS";
            ingredientsList.append(ingredientsTag);

            for(let p in c){
                if(p.startsWith("strIngredient")){
                    if(c[p] !== null && c[p].length > 0){
                        let ingredient = document.createElement("li");
                        if(c["strMeasure" + p[p.length - 1]] === null){
                            c["strMeasure" + p[p.length - 1]] = "";
                        }
                        ingredient.innerHTML = c["strMeasure" + p[p.length - 1]] + " " + c[p];
                        ingredientsList.append(ingredient);
                    }
                }
            }

            let topRight = document.getElementById("topRight");
            topRight.append(ingredientsList);

            // instructions
            let instructionsDiv = document.createElement("p");
            instructionsDiv.id = "instructionsDiv";    
            let instructionsTag = document.createElement("p");
            instructionsTag.id = "instructionsTag";
            instructionsTag.innerHTML = "INSTRUCTIONS";
            let br = document.createElement("br");
            instructionsDiv.append(br)
            instructionsDiv.append(instructionsTag);
            let instructions = c.strInstructions;
            instructionsDiv.append(instructions);
            bottom.append(instructionsDiv);
        }
        )
        .catch(err => console.error(`Fetch problem: ${err.message}`))
});
