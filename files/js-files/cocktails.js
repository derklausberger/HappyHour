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

                let a = document.createElement('a');
                divCocktailImage.append(a);
                a.href = "cocktail-details.html?id=" + cocktail.idDrink;

                let cocktailImage = document.createElement("img");
                a.append(cocktailImage);
                cocktailImage.src = cocktail.strDrinkThumb;
                cocktailImage.alt = "Images of " + cocktail.strDrink;
                cocktailImage.className = "img-responsive imgCocktails";

                let divP = document.createElement("div");
                a.append(divP);
                divP.innerHTML = "Click here for Recipe";
                divP.className = "hoverText";

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