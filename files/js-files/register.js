document.addEventListener("submit", function (event) {
    event.preventDefault();

    var username = document.getElementById("email").value;
    var firstname = document.getElementById("firstName").value;
    var lastname = document.getElementById("lastName").value;
    var password1 = document.getElementById("password1").value;
    var password2 = document.getElementById("password2").value;

    if (password1 == password2 && password1 != "" && password2 != ""){
        fetch ("/api/register", {
                method: "post",
                headers: {
                    "content-type": "application/json; charset=UTF-8"
                },
                body:  JSON.stringify({
                    firstName: firstname,
                    lastName: lastname,
                    email: username,
                    password: password1,
                    
                })
        })  
        .then(response => {
            if (!response.ok) {
                if (response.status == 400){
                    alert("This user already exists!");
                } else {
                    throw new Error(`HTTP error: ${response.status}`);
                }
            } else {
                location.href = response.url;
            }
        })
        .catch(error => console.error("Error:", error));
    } else {
        alert ("Passwords have to match");
    }
});