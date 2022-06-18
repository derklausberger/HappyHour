document.addEventListener("DOMContentLoaded", function (event) {
    //document.getElementsByTagName("link")[0].import;
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
            container.className = "container";


            let rowdiv = document.createElement('div');
            container.append(rowdiv);
            rowdiv.className = "row justify-content-center t";

            for (let cocktail of Array.from(cocktails)) {
                let div = document.createElement('div');
                rowdiv.append(div);
                div.className = "col-8 border";

                let divCocktailName = document.createElement('div');
                div.append(divCocktailName);
                divCocktailName.className = 'row justify-content-center';

                let cocktailName = document.createElement('h1');
                divCocktailName.append(cocktailName);
                cocktailName.innerHTML = cocktail.strDrink;

                let divCocktailImage = document.createElement("div");
                div.append(divCocktailImage);
                divCocktailImage.className = "row justify-content-center";

                let cocktailImage = document.createElement("img");
                divCocktailImage.append(cocktailImage);
                cocktailImage.src = cocktail.strDrinkThumb;
                cocktailImage.alt = "Images of " + cocktail.strDrink;
                cocktailImage.className = "img-responsive imgCocktails";

                let divUserFunctions = document.createElement("div");
                div.append(divUserFunctions);
                divUserFunctions.className = "row test";

                let col1UserFunctions = document.createElement("div");
                divUserFunctions.append(col1UserFunctions);
                col1UserFunctions.className = "col";

                let rowForLikes = document.createElement("div");
                col1UserFunctions.append(rowForLikes);
                rowForLikes.className = "row";

                let col1ForLikes = document.createElement("div");
                rowForLikes.append(col1ForLikes);
                col1ForLikes.className = "col images";

                let generalLikesImage = document.createElement("img");
                col1ForLikes.append(generalLikesImage);
                generalLikesImage.src = "images/heartFull.jpg";
                generalLikesImage.width = "20";
                generalLikesImage.height = "20";
                generalLikesImage.alt = "Image for amount of likes of " + cocktail.strDrink;

                let col2ForLikes = document.createElement("div");
                rowForLikes.append(col2ForLikes);
                col2ForLikes.className = "col text-left res";

                let amountLikesParagraph = document.createElement("p");
                col2ForLikes.append(amountLikesParagraph);
                if (cocktail.likes > 1 || cocktail.likes == 0) {
                    amountLikesParagraph.innerHTML = cocktail.likes + " Likes";
                } else {
                    amountLikesParagraph.innerHTML = cocktail.likes + " Like";
                }

                let col2UserFunctions = document.createElement("div");
                divUserFunctions.append(col2UserFunctions);
                col2UserFunctions.className = "col text-right likes";

                let likeButton = document.createElement("button");
                col2UserFunctions.append(likeButton);
                likeButton.type = "submit";
                likeButton.className = "btn bnt-light";

                /* let div2 = document.createElement('div');
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
                 a.innerHTML = 'Recipe...';
                 a.href = "cocktail-details.html?id=" + cocktail.idDrink;
 
                 let div7 = document.createElement("div");
                 div5.append(div7);
                 div7.className = "col text-left";
 
                 
 
                 let button = document.createElement('button');
                 let imageHeart = document.createElement('img');
                 div7.append(button);
                 button.type = 'submit';
                 imageHeart.src = "/images/heartEmpty.jpg";
                 imageHeart.height = "20";
                 imageHeart.width = "20";
                 button.id = "likeButton";
                 button.append(imageHeart);
                 
 
                 button.onclick = () => {
                     console.log(cocktail.idDrink);*/
                let a = document.createElement('a');
                div.append(a);
                a.innerHTML = 'Recipe...';
                a.href = "cocktail-details.html?id=" + cocktail.idDrink;

                let likeImage = document.createElement("img");
                likeButton.append(likeImage);
                if (cocktail.liked == false) {
                    likeImage.src = "/images/heartEmpty.jpg";
                } else {
                    likeImage.src = "/images/heartFull.jpg";
                }
                likeImage.alt = "Image of Like Button";
                likeImage.height = "20";
                likeImage.width = "20";

                let col3UserFunctions = document.createElement("div");
                divUserFunctions.append(col3UserFunctions);
                col3UserFunctions.className = "col text-right comment";

                let commentButton = document.createElement("button");
                col3UserFunctions.append(commentButton);
                commentButton.className = "btn btn-light"

                let commentImage = document.createElement("img");
                commentButton.append(commentImage);
                commentImage.src = "images/icon.jpg";
                commentImage.alt = "Images of Comment Button";
                commentImage.height = "20";
                commentImage.width = "20";

                let divCommentHeader = document.createElement("div");
                div.append(divCommentHeader);
                divCommentHeader.className = "row test";

                let commentHeader = document.createElement("h3");
                divCommentHeader.append(commentHeader);
                commentHeader.innerHTML = "Comments";
                commentHeader.className = "comment";

                let divComment = document.createElement("div");
                div.append(divComment);
                divComment.className = "row test";

                let comment = document.createElement("p");
                divComment.append(comment);
                comment.innerHTML = "Irgendein Kommentar";


                likeButton.onclick = () => {
                    if (cocktail.liked == false) {
                        fetch("/api/like", {
                            method: "post",
                            headers: {
                                "content-type": "application/json; charset=UTF-8"
                            },
                            body: JSON.stringify({
                                id: cocktail.idDrink
                            })

                        })
                            .catch(error => console.error("Error:", error));
                    } else {
                        fetch("/api/deletelike", {
                            method: "delete",
                            headers: {
                                "content-type": "application/json; charset=UTF-8"
                            },
                            body: JSON.stringify({
                                id: cocktail.likeArray[0].id
                            })
                        })
                            .catch(error => console.error("Error:", error));
                    }
                };
            }
        }).catch(err => console.error(`Fetch problem: ${err.message}`));
})