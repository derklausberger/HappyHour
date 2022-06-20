// for second frontend to change the frontend
document.addEventListener("DOMContentLoaded", function (event) {
    let buttonChangeFrontend = document.querySelector("button");
    buttonChangeFrontend.onclick = () => {
        let appointments1 = document.getElementById("appointments1");
        let appointments2 = document.getElementById("appointments2");
        appointments1.replaceChild(appointments2, appointments1.childNodes[0]);
    }
})