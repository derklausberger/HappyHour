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
document.addEventListener("DOMContentLoaded", function (event) {

    let cocktailH2= document.createElement("h2");
    let cocktailBtn = document.createElement("button");
    let cockPic = document.createElement("img");
    let i = document.createElement("img");


    cocktailH2.innerHTML = "Mojito";
    cocktailH2.id = "überschrift";
    i.src = "/images/heartLeer.jpg";
    i.id = "heart";
    cockPic.src ="/images/cokctail.jpeg";
    cockPic.id = "cockPic";
    cocktailBtn.append(i);
    cocktailBtn.id = "cocktailBtn";

    cocktailBtn.onclick = tausch;

    let ingrlist = document.createElement("ul");
    //for Schleife für die Ingredients
    let ingr = document.createElement("li");
    ingr.innerHTML = "hi";

    ingrlist.append(ingr);
    let rightUp = document.getElementById("right-up");
    rightUp.append(ingrlist);

    let leftDown = document.getElementById("left-down");
    leftDown.append(cocktailBtn);

    let instructions = document.createElement("p");
    instructions.innerHTML = "Die unbehandelten Limetten waschen und die Limettenenden abschneiden. Nun die Limetten achteln und zusammen mit dem braunen Zucker und der Minze in ein Longdrinkglas geben. Die Limettenstücke und auch die Minzblätter mit einem Stößel oder Pistill etwas zerdrücken - aber nicht zu viel also nicht komplett zerquetschen. Zum Schluss das Glas mit den Crushed Ice füllen, den weißen Rum dazu und das Glas mit dem Soda auffüllen. Der Mojito kann beliebig mit ein paar Limettenscheiben und Minzblätter garniert werden.";
    leftDown.append(instructions);

    let main = document.querySelector("main");
    let leftup = document.getElementById("left-up");
    main.prepend(cocktailH2);
    leftup.appendChild(cockPic);

    function tausch(){
        document.getElementById("cocktailBtn").setAttribute("src", "/images/heartFull.jpg");
        }
});