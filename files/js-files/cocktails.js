document.addEventListener("DOMContentLoaded", function (event) {
    document.getElementsByTagName("link")[0].import;
    fetch('/api/cocktails')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            return response.json();
        })
        .then(cocktails => {
            let cnt = 0;

            let container = document.createElement('div');
            document.querySelector('main').append(container);
            container.className = "containerCocktail";


            let rowdiv = document.createElement('div');
            container.append(rowdiv);
            rowdiv.className = "row rowClass";
            
            for (let cocktail of Array.from(cocktails)) {
                let div = document.createElement('div');
                rowdiv.append(div);
                div.className = "col";
                
                let div2 = document.createElement('div');
                div.append(div2);
                div2.className = 'text-center';

                let article = document.createElement("article");
                div2.append(article);
                article.className = "divsCocktails";

                let h2 = document.createElement('h2');
                article.append(h2);
                h2.innerHTML = cocktail.strDrink;
                h2.className = "h2Cocktails";

                let div3 = document.createElement("div");
                div3.className = "row";
                article.append(div3);

                let div4 = document.createElement("div");
                div3.append(div4);
                div4.className = "col"

                let img = document.createElement('img');
                div4.append(img)
                img.src = cocktail.strDrinkThumb;
                img.alt = 'alt';
                img.className = "img-responsive imgCocktails";

                let div5 = document.createElement("div");
                div5.className = "row";
                article.append(div5);

                let div6 = document.createElement("div");
                div6.className = "col text-right";
                div5.append(div6);

                let a = document.createElement('a');
                div6.append(a);
                a.innerHTML = cocktail.likes;

                let div7 = document.createElement("div");
                div5.append(div7);
                div7.className = "col text-left";

                let button = document.createElement('button');
                let imageHeart = document.createElement('img');
                div7.append(button);
                
                button.type = 'submit';
                button.innerHTML = 'Like!';
                imageHeart.src = "/images/heartLeer.jpg";
                imageHeart.height = "20";
                imageHeart.width = "20";
                button.append(imageHeart);
                
                button.onclick = () => {
                    fetch ("/api/like", {
                        method: "post",
                        headers: {
                            "content-type": "application/json; charset=UTF-8"
                        },
                        body:  JSON.stringify({
                            id: cocktail.idDrink
                        })
                        
                    })  
                    .catch(error => console.error("Error:", error));
                };

                //document.querySelector('main').appendChild(div);
                cnt = cnt + 1;
            }
        }).catch(err => console.error(`Fetch problem: ${err.message}`));;
});