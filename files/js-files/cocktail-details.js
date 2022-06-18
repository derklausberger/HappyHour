
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
    fetch('/api/cocktails/'+ parser.get("id")) // + parser.get("id")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            return response.json();
        })
        .then(cocktail => {
            console.log(cocktail);
            let c = cocktail.drinks[0];
            // heading
            let cocktailH2 = document.createElement("h2");
            cocktailH2.innerHTML = c.strDrink;
            cocktailH2.id = "cocktailH2";
            let topLeft = document.getElementById("topLeft");
            topLeft.prepend(cocktailH2);

            // picture
            let cockPic = document.createElement("img");
            cockPic.src = "/images/cokctail.jpeg";
            cockPic.id = "cockPic";

            topLeft.appendChild(cockPic);

            // icon on button
            let icon = document.createElement("img");            
            icon.src = "/images/heartEmpty.jpg";
            icon.id = "heart";
            let likeButton = document.createElement("button");
            likeButton.id = "likeButton";
            likeButton.append(icon);
            let bottomLeft = document.getElementById("bottomLeft");
            bottomLeft.append(likeButton);

            // when clicked
            likeButton.onclick = tausch;

            // list of ingredients
            let ingredientsList = document.createElement("ul");
            let ingredients = document.createElement("li");
            ingredients.innerHTML = "hi";
            ingredientsList.append(ingredients);
            let topRight = document.getElementById("topRight");
            topRight.append(ingredientsList);

            // instructions
            let instructions = document.createElement("p");
            instructions.innerHTML = "Die unbehandelten Limetten waschen und die Limettenenden abschneiden. Nun die Limetten achteln und zusammen mit dem braunen Zucker und der Minze in ein Longdrinkglas geben. Die Limettenstücke und auch die Minzblätter mit einem Stößel oder Pistill etwas zerdrücken - aber nicht zu viel also nicht komplett zerquetschen. Zum Schluss das Glas mit den Crushed Ice füllen, den weißen Rum dazu und das Glas mit dem Soda auffüllen. Der Mojito kann beliebig mit ein paar Limettenscheiben und Minzblätter garniert werden.";
            bottomLeft.append(instructions);          

        }).catch(err => console.error(`Fetch problem: ${err.message}`));

});