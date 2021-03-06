document.addEventListener("DOMContentLoaded", function (event) {
    var login = document.getElementById("login");
    login.addEventListener("submit", function (event) {
        event.preventDefault();

        var username = document.getElementById("email").value;
        var password = document.getElementById("password").value;

        fetch("/api/login", {
            method: "post",
            headers: {
                "content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                email: username,
                password: password,
            })
        }).then(response => {
            if (!response.ok) {
                if (response.status == 400) {
                    alert(response.statusText);
                } else if (response.status == 401) {
                    alert(response.statusText)
                } else {
                    throw new Error(`HTTP error: ${response.status}`);
                }
            } else {
                window.location.href = "/index.html";
            }
        }).catch(error => console.error("Error:", error));
    })

})