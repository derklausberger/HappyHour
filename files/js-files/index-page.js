document.addEventListener("DOMContentLoaded", function (event) {
    fetch('/api/random-cocktails').then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
    }).then(cocktails => {
        if (document.querySelector(".lds-dual-ring") != null) {
            document.querySelector(".lds-dual-ring").remove();
        }

        console.log(cocktails)

        Array.from(cocktails).forEach(c => {
            let span = document.createElement('div');
            span.innerHTML = c.strDrink;
            span.appendChild(document.createElement("br"))
            document.querySelector("main")
                .append(span);
        })
    });
})