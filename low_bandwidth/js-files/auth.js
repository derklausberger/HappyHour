document.addEventListener("DOMContentLoaded", function (event) {
    if (sessionStorage.getItem("username") == null){
        this.location.href="/low_bandwidth/error.html";
    }
});