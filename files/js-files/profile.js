// for second frontend to change the frontend
document.addEventListener("DOMContentLoaded", function (event) {
    let buttonChangeFrontend = document.querySelector("#changeFrontend");
    buttonChangeFrontend.onclick = () => {
        fetch('/low-bw').then(window.location.href = "/low_bandwidth/html-files/profile.html");
    }

    let div = document.getElementById("boxUser");
    fetch("/api/getUser")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            return response.json();
        }).then(data => {
            let email = document.createElement("p");
            div.append(email);
            email.innerHTML = data.email;

            let name = document.createElement("p");
            div.append(name);
            name.innerHTML = data.firstName + " " + data.lastName;

            let changePw = document.createElement("button");
            div.append(changePw);
            changePw.className = "btn btn-light";
            changePw.innerHTML = "Change Password";

            let input1 = document.createElement("input");
            input1.placeholder = "New Password";
            input1.className = "form-control int";
            input1.type = "password";

            let input2 = document.createElement("input");
            input2.placeholder = "Repeat Password";
            input2.className = "form-control int";
            input2.type = "password";

            changePw.onclick = () => {
                div.append(input1);
                div.append(input2);
                if (input1.value != "" && input2.value != ""){
                    if(input1.value == input2.value){
                        fetch("/api/changePassword", {
                            method: "PATCH",
                            headers: {
                                "content-type": "application/json; charset=UTF-8"
                            },
                            body: JSON.stringify({
                                password: input1.value
                            })
                        })
                       .then(response => {
                            if (!response.ok) {
                                if (response.status == 400) {
                                    alert(response.statusText);
                                } else {
                                    throw new Error(`HTTP error: ${response.status}`);
                                }
                            } else {
                            window.location.href = "/profile.html";;
                            }
                        })
                        .catch(error => console.error("Error:", error));
                    } else {
                        alert("Die Passwörter müssen übereinstimmen");
                    }
                }
            }
    }).catch(err => console.error(`Fetch problem: ${err.message}`));

    

    fetch('/api/allCocktails')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
    })
    .then(cocktails => {
        if (document.querySelector(".lds-dual-ring") != null) {
            document.querySelector(".lds-dual-ring").remove();
        }

        let div = document.createElement("div");
        document.querySelector("main").append(div);
        div.className = "container cont";

        let row = document.createElement("div");
        div.append(row);
        row.className = "row justify-content-center";

        for (let cocktail of Array.from(cocktails)) {
                let oberdiv = document.createElement("div");
                oberdiv.className = "col-8 rowProfile";

                let divInfo = document.createElement("div");
                oberdiv.append(divInfo);
                divInfo.className = "row justify-content-center";

                let header = document.createElement("h2");
                divInfo.append(header);
                header.innerHTML = cocktail.strDrink;
                header.className = "header";

                let rowdiv = document.createElement("div");
                oberdiv.append(rowdiv);
                rowdiv.className = "row justify-content-center";

                let divImage = document.createElement("div");
                rowdiv.append(divImage);
                divImage.className = "col-8 text-center";

                let a = document.createElement('a');
                divImage.append(a);
                a.href = "cocktail-details.html?id=" + cocktail.idDrink;
                a.className = "linkImages";

                let cocktailImage = document.createElement("img");
                a.append(cocktailImage);
                cocktailImage.src = cocktail.strDrinkThumb;
                cocktailImage.alt = "Images of " + cocktail.strDrink;
                cocktailImage.className = "img-responsive profileImages";

                let divP = document.createElement("div");
                a.append(divP);
                divP.innerHTML = "Click here for Recipe";
                divP.className = "hoverText";

                cocktail.liked = false;
                for (let like of cocktail.likes) {
                    if (like == loggedIn) {
                        cocktail.liked = true;
                        break;
                    }
                }

                if (cocktail.liked){
                    row.append(oberdiv);
                    console.log(cocktail);
                }
        }
    }).catch(err => console.error(`Fetch problem: ${err.message}`));
})