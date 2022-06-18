function include() {
    var tags = document.querySelectorAll('*[import-ref]:not([import-ref=""]');

    var file, xhttp;
    tags.forEach(t => {
        file = t.getAttribute("import-ref");
        if (file) {
            xhttp = new XMLHttpRequest();

            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        t.innerHTML = this.responseText;
                    } else if (this.status == 404) {
                        t.innerHTML = "<p>Navbar file not found.<p>";
                    }
                    t.removeAttribute("import-ref");
                }
            }

            xhttp.open("GET", file, true);
            xhttp.send();
        }
    });
}

document.addEventListener("DOMContentLoaded", function (event) {
    include();
});