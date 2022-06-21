document.addEventListener("DOMContentLoaded", function (event) {
    //document.getElementsByTagName("link")[0].import;

    let centerDiv = document.createElement("div");
    document.querySelector("main").append(centerDiv);
    centerDiv.setAttribute("style", "text-align: center;");

    let btnRow = document.createElement("div");
    centerDiv.append(btnRow);
    btnRow.setAttribute("style", "margin-top: 15px; margin-bottom: 15px;");

    btnRow.className = "btn-group btn-group-md flex-wrap";
    btnRow.id = "btnLetters";
    for (let i = 0; i < 26; i++) {
        let letter = String.fromCharCode(i + 65);
        let button = document.createElement("button");
        button.innerHTML = letter;
        button.className = "btn btn-light";
        button.id = "btn-" + letter;
        btnRow.append(button);

        button.onclick = () => {
            document.querySelectorAll(".btn.btn-dark").forEach(btn => {
                btn.className = "btn btn-light";
            });
            button.className = "btn btn-dark";
            if (document.querySelector(".container") != null) {
                document.querySelector(".container").remove();
            }
            loadCocktails(letter);
        }
    }

    document.querySelector("#btn-A").click();
})

function loadCocktails(letter) {
    fetch('/api/cocktails/' + letter).then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
    })
        .then(cocktails => {
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

                let link = document.createElement("a");
                divCocktailName.append(link);
                link.id = cocktail.idDrink;

                let cocktailName = document.createElement('h1');
                link.append(cocktailName);
                cocktailName.innerHTML = cocktail.strDrink;
                cocktailName.id = "cocktailName";

                let divCocktailImage = document.createElement("div");
                div.append(divCocktailImage);
                divCocktailImage.className = "row justify-content-center";

                let a = document.createElement('a');
                divCocktailImage.append(a);
                a.href = "cocktail-details.html?id=" + cocktail.idDrink;
                a.className = "linkImages";

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
                if (cocktail.likes.length > 1 || cocktail.likes.length == 0) {
                    amountLikesParagraph.innerHTML = cocktail.likes.length + " Likes";
                } else {
                    amountLikesParagraph.innerHTML = cocktail.likes.length + " Like";
                }

                let col2UserFunctions = document.createElement("div");
                divUserFunctions.append(col2UserFunctions);
                col2UserFunctions.className = "col text-right likes";

                let likeButton = document.createElement("button");
                col2UserFunctions.append(likeButton);
                likeButton.type = "submit";
                likeButton.className = "btn but";

                let likeImage = document.createElement("img");
                likeButton.append(likeImage);

                cocktail.liked = false;
                for (let like of cocktail.likes) {
                    if (like == loggedIn) {
                        cocktail.liked = true;
                        break;
                    }
                }

                likeImage.src = !cocktail.liked ? "/images/heartEmpty.jpg"
                    : "/images/heartFull.jpg";

                likeImage.alt = "Image of Like Button";
                likeImage.height = "20";
                likeImage.width = "20";

                let col3UserFunctions = document.createElement("div");
                divUserFunctions.append(col3UserFunctions);
                col3UserFunctions.className = "col text-right comment";

                let commentButton = document.createElement("button");
                col3UserFunctions.append(commentButton);
                commentButton.type = "submit";
                commentButton.className = "btn but"

                let commentImage = document.createElement("img");
                commentButton.append(commentImage);
                commentImage.src = "images/comment.png";
                commentImage.alt = "Images of Comment Button";
                commentImage.height = "20";
                commentImage.width = "20";

                let divCommentHeader = document.createElement("div");
                div.append(divCommentHeader);
                divCommentHeader.className = "row test";


                let commentHeader = document.createElement("h3");
                divCommentHeader.append(commentHeader);
                commentHeader.innerHTML = "Comments";
                divCommentHeader.id = "divCommentHeader";
                commentHeader.className = "comment";

                /****************************************** */
                /*Input für drücken auf comment button*/
                let divWrite = document.createElement("div");
                divWrite.className = "row test";

                let colInput = document.createElement("div");
                divWrite.append(colInput);
                colInput.className = "col input";

                let input = document.createElement("input");
                colInput.append(input);
                input.type = "text";
                input.id = "comment";
                input.className = "form-control";
                /******************************************** */
                if (cocktail.comments.length == 0) {
                    let divComment = document.createElement("div");
                    div.append(divComment);
                    divComment.className = "row test";

                    let nocomments = document.createElement("p");
                    divComment.append(nocomments);
                    nocomments.innerHTML = "Noch keine Kommentare vorhanden";
                } else {
                    for (let comment of cocktail.comments) {
                        let divComment = document.createElement("div");
                        div.append(divComment);
                        divComment.className = "row test";

                        let col1 = document.createElement("div");
                        divComment.append(col1);
                        col1.className = "col-10 pad";

                        let p = document.createElement("p");
                        col1.append(p);
                        p.innerHTML = comment.comment;

                        if (comment.userId == loggedIn) {
                            let col2 = document.createElement("div");
                            divComment.append(col2);
                            col2.className = "col-1 pad text-right";

                            let buttonEdit = document.createElement("button");
                            col2.append(buttonEdit);
                            buttonEdit.type = "submit";
                            buttonEdit.className = "btn but"

                            let imgEdit = document.createElement("img");
                            buttonEdit.append(imgEdit);
                            imgEdit.src = "/images/edit.png";
                            imgEdit.alt = "Images of Edit button";
                            imgEdit.height = "20";
                            imgEdit.width = "20";

                            cnt = 0;
                            buttonEdit.onclick = () => {
                                if (cnt == 0) {
                                    div.append(divWrite);
                                    input.value = comment.comment;
                                    cnt++;
                                }

                                if (input.value != '' && input.value != comment.comment) {
                                    fetch("/api/editComment", {
                                        method: "put",
                                        headers: {
                                            "content-type": "application/json; charset=UTF-8"
                                        },
                                        body: JSON.stringify({
                                            id: comment.id,
                                            cocktailId: cocktail.idDrink,
                                            comment: input.value
                                        })
                                    })
                                        .catch(error => console.error("Error:", error));
                                }
                            }

                            let col3 = document.createElement("div");
                            divComment.append(col3);
                            col3.className = "col-1 pad text-right";

                            let buttonDelete = document.createElement("button");
                            col3.append(buttonDelete);
                            buttonDelete.type = "submit";
                            buttonDelete.className = "btn but"

                            let imgDel = document.createElement("img");
                            buttonDelete.append(imgDel);
                            imgDel.src = "/images/delete.png";
                            imgDel.alt = "Images of Edit button";
                            imgDel.height = "20";
                            imgDel.width = "20";

                            buttonDelete.onclick = () => {
                                fetch("/api/deleteComment", {
                                    method: "delete",
                                    headers: {
                                        "content-type": "application/json; charset=UTF-8"
                                    },
                                    body: JSON.stringify({
                                        id: comment.id
                                    })
                                })
                                    .catch(error => console.error("Error:", error));
                            }
                        }
                    }
                }

                likeButton.onclick = () => {
                    if (!cocktail.liked) {
                        likeImage.src = "/images/heartFull.jpg";
                        cocktail.liked = true;


                        fetch("/api/like", {
                            method: "post",
                            headers: {
                                "content-type": "application/json; charset=UTF-8"
                            },
                            body: JSON.stringify({
                                idDrink: cocktail.idDrink
                            })
                        }).then(res => {
                            if (!res.ok) {
                                throw new Error(`HTTP error: ${res.status}`);
                            }
                            return res.json();
                        }).then(likes => {
                            cocktail.likes = Array.from(likes);

                            if (cocktail.likes.length > 1 || cocktail.likes.length == 0) {
                                amountLikesParagraph.innerHTML = cocktail.likes.length + " Likes";
                            } else {
                                amountLikesParagraph.innerHTML = cocktail.likes.length + " Like";
                            }
                        }).catch(error => console.error("Error:", error));
                    } else {
                        likeImage.src = "/images/heartEmpty.jpg";
                        cocktail.liked = false;

                        fetch("/api/deletelike", {
                            method: "delete",
                            headers: {
                                "content-type": "application/json; charset=UTF-8"
                            },
                            body: JSON.stringify({
                                idDrink: cocktail.idDrink
                            })
                        }).then(res => {
                            if (!res.ok) {
                                throw new Error(`HTTP error: ${res.status}`);
                            }
                            return res.json();
                        }).then(likes => {
                            cocktail.likes = Array.from(likes);

                            if (cocktail.likes.length > 1 || cocktail.likes.length == 0) {
                                amountLikesParagraph.innerHTML = cocktail.likes.length + " Likes";
                            } else {
                                amountLikesParagraph.innerHTML = cocktail.likes.length + " Like";
                            }
                        })
                            .catch(error => console.error("Error:", error));
                    }
                };

                commentButton.onclick = () => {
                    div.append(divWrite);
                    if (input.value != '') {
                        fetch("/api/comment", {
                            method: "post",
                            headers: {
                                "content-type": "application/json; charset=UTF-8"
                            },
                            body: JSON.stringify({
                                id: cocktail.idDrink,
                                comment: input.value
                            })
                        })
                            .catch(error => console.error("Error:", error));
                    }
                }
            }
        }).catch(err => console.error(`Fetch problem: ${err.message}`));
}