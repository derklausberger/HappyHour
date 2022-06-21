// for second frontend to change the frontend
document.addEventListener("DOMContentLoaded", function (event) {
    let buttonChangeFrontend = document.querySelector("#changeFrontend");
    buttonChangeFrontend.onclick = () => {
        fetch('/low-bw').then(res => {
            window.location.href = "/profile.html";
        });
    }
})