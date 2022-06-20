var loggedIn = null;
fetch('/user', { method: 'POST' })
    .then(res => {
        if (res.redirected) {
            window.location.href = res.url;
        }
        return res.json();
    }).then(res => {
        loggedIn = res.user;
    }).catch(err => console.error(err));