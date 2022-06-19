document.addEventListener("DOMContentLoaded", function (event) {
    sessionStorage.clear();
    var login = document.getElementById("login");
    login.addEventListener("submit", function (event) {
        event.preventDefault();

        var username = document.getElementById("email").value;
        var password1 = document.getElementById("password").value;

        fetch ("/api/login", {
                method: "post",
                headers: {
                    "content-type": "application/json; charset=UTF-8"
                },
                body:  JSON.stringify({
                    email: username,
                    password: password1,
                    
                })
        })  
        .then(response => {
            if (!response.ok) {
                if (response.status == 400){
                    alert("Kein Benutzer mit dieser Email");
                } else if (response.status == 401) {
                    alert("Passwort stimmt nicht")
                }else {
                    throw new Error(`HTTP error: ${response.status}`);
                }
            } else {
                sessionStorage.setItem("username", username);
                location.href = response.url;
            }
        })
        .catch(error => console.error("Error:", error));
    })

})