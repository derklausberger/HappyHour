function include() {
    var tags = document.querySelectorAll('*[title]:not([title=""]');

    var file, xhttp;
    tags.forEach(t => {
        file = t.getAttribute("title");
        if (file) {
            xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        t.innerHTML = this.responseText;
                        logout();
                    } else if (this.status == 404) {
                        t.innerHTML = "<p>File not found.<p>";
                    }
                    t.removeAttribute("title");
                }
            }

            xhttp.open("GET", file, true);
            xhttp.send();
        }
    });
}

function logout() {
    let logout = document.getElementById("logout");
    logout.onclick = () => {
        fetch('/logout').then(response => {
            if (!response.ok) {
                if (response.status == 400) {
                    alert(response.statusText);
                } else if (response.status == 401) {
                    alert(response.statusText)
                } else {
                    throw new Error(`HTTP error: ${response.status}`);
                }
            } else {
                window.location.href = "/home.html";
            }
        }).catch(error => console.error("Error:", error));
        loggedIn = null;
    };
}

document.addEventListener("DOMContentLoaded", function (event) {
    include();
});