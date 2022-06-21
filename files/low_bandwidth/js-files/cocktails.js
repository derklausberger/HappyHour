document.addEventListener("DOMContentLoaded", function (event) {
    //document.getElementsByTagName("link")[0].import;

    let centerDiv = document.createElement("div");
    document.querySelector("main").append(centerDiv);

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
    fetch('/api/cocktails', {
        method: "post",
        headers: {
            "content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
            letter: letter
        })
    }).then(response => {
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
                a.innerHTML = "Click here for the Recipe";

                let divUserFunctions = document.createElement("div");
                div.append(divUserFunctions);
                divUserFunctions.className = "row test";

                let col1UserFunctions = document.createElement("div");
                divUserFunctions.append(col1UserFunctions);
                col1UserFunctions.className = "col";

                let rowForLikes = document.createElement("div");
                col1UserFunctions.append(rowForLikes);
                rowForLikes.className = "row";

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
                likeButton.innerHTML = "Like";

                cocktail.liked = false;
                for (let like of cocktail.likes) {
                    if (like == loggedIn) {
                        cocktail.liked = true;
                        break;
                    }
                }

                let col3UserFunctions = document.createElement("div");
                divUserFunctions.append(col3UserFunctions);
                col3UserFunctions.className = "col text-right comment";

                let commentButton = document.createElement("button");
                col3UserFunctions.append(commentButton);
                commentButton.type = "submit";
                commentButton.className = "btn but"
                commentButton.innerHTML = "Comment";

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

                let divComment = document.createElement("div");
                div.append(divComment);
                divComment.className = "row test";
                let nocomments = document.createElement("p");
                
                if (cocktail.comments.length == 0){
                    divComment.appendChild(nocomments);
                    nocomments.innerHTML = "Noch keine Kommentare vorhanden";
                } else {
                    for (let comment of cocktail.comments) {
                        let col1 = document.createElement("div");
                        divComment.append(col1);
                        col1.className = "col-10 pad";
                        col1.id= comment[1];

                        let p = document.createElement("p");
                        col1.append(p);
                        p.innerHTML = comment[1];
                        p.id = comment[1] + "p";

                        if (comment[0] == loggedIn) {
                            let col2 = document.createElement("div");
                            divComment.append(col2);
                            col2.className = "col-1 pad text-right";
                            col2.id = comment[1] + "1";

                            let buttonEdit = document.createElement("button");
                            col2.append(buttonEdit);
                            buttonEdit.type = "submit";
                            buttonEdit.className = "btn but"
                            buttonEdit.innerHTML = "Edit";

                            cnt = 0;
                            buttonEdit.onclick = () => {
                                if (cnt == 0) {
                                    div.append(divWrite);
                                    input.value = comment[1];
                                    cnt++;
                                }

                                if (input.value != '' && input.value != comment[1]) {
                                    let changedp = document.getElementById(comment[1]+"p");
                                    changedp.innerHTML = input.value;
                                    
                                    divWrite.style.display = "none";

                                    let butEd = document.getElementById(comment[1]+"1");
                                    let butDel = document.getElementById(comment[1]+"2");
                                    butEd.style.display = "none";
                                    butDel.style.display = "none";

                                    fetch("/api/editComment", {
                                        method: "put",
                                        headers: {
                                            "content-type": "application/json; charset=UTF-8"
                                        },
                                        body: JSON.stringify({
                                            cocktailId: cocktail.idDrink,
                                            comment: input.value,
                                            commentOld: comment[1]
                                        })
                                    })
                                    .catch(error => console.error("Error:", error));
                                    input.value = "";
                                }
                            }

                            let col3 = document.createElement("div");
                            divComment.append(col3);
                            col3.className = "col-1 pad text-right";
                            col3.id = comment[1] + "2";

                            let buttonDelete = document.createElement("button");
                            col3.append(buttonDelete);
                            buttonDelete.type = "submit";
                            buttonDelete.className = "btn but";
                            buttonDelete.innerHTML = "Delete";

                            buttonDelete.onclick = () => {
                                if (cocktail.comments.length-1 == 0){
                                    divComment.appendChild(nocomments);
                                    nocomments.innerHTML = "Noch keine Kommentare vorhanden";
                                }
                                let comentDel = document.getElementById(comment[1]);
                                let butEd = document.getElementById(comment[1]+"1");
                                let butDel = document.getElementById(comment[1]+"2");
                                comentDel.style.display = "none";
                                butEd.style.display = "none";
                                butDel.style.display = "none";

                                fetch("/api/deleteComment", {
                                    method: "delete",
                                    headers: {
                                        "content-type": "application/json; charset=UTF-8"
                                    },
                                    body: JSON.stringify({
                                        id: cocktail.idDrink,
                                        comment: comment[1]
                                    })
                                })
                                    .catch(error => console.error("Error:", error));
                            }
                        }
                    }
                }

                likeButton.onclick = () => {
                    if (!cocktail.liked) {
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
                        if (cocktail.comments.length == 0) {
                            nocomments.style.display = "none";
                        }
                        divWrite.style.display = "none";
                        let col1 = document.createElement("div");
                        divComment.appendChild(col1);
                        col1.className = "col-10 pad";

                        let p = document.createElement("p");
                        col1.append(p);
                        p.innerHTML = input.value;

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
                        input.value = "";
                    }
                }
            }
        }).catch(err => console.error(`Fetch problem: ${err.message}`));
}