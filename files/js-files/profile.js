// for second frontend to change the frontend
document.addEventListener("DOMContentLoaded", function (event) {
    let buttonChangeFrontend = document.querySelector("#changeFrontend");
    buttonChangeFrontend.onclick = () => {
        fetch('/low-bw').then(window.location.href = "/low_bandwidth/html-files/profile.html");
    }
})