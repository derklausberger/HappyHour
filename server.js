const express = require('express');

const barRouter = require('./api/routes/bar-router');
const cocktailRouter = require('./api/routes/cocktail-router');
const userRouter = require('./api/routes/user-router');

const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT ?? 5500;


///////////////////////////////////

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

app.use(cookieParser());
app.use(session({
    secret: "secret",
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));

app.post('/user', (req, res) => {
    if (!req.session.user) {
        return res.status(301).redirect('/error.html');
    } else {
        return res.send({ user: req.session.user });
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy();
    return res.status(200).redirect('/home.html');
});

app.get('/low-bw', (req, res, next) => {
    if (req.cookies.low_bw === undefined) {
        var randomNumber = Math.random().toString();
        randomNumber = randomNumber.substring(2, randomNumber.length);
        res.cookie("low_bw", randomNumber, { maxAge: oneDay, httpOnly: true });
        next();
    } else {
        res.clearCookie("low_bw");
        next();
    }
});

///////////////////////////////////
const path = require('path');
const bodyParser = require('body-parser');
const { nextTick } = require('process');
const { runInNewContext } = require('vm');

// Serving static files from folder 'files'
app.use(express.static(path.join(__dirname, 'files')), (req, res, next) => {
    let destUrl;
    const parts = req.originalUrl.split("/");
    console.log("a" + req.url + "    " + req.cookies.low_bw);
    
    if (req.cookies !== undefined && req.cookies.low_bw) {
        if (parts.length > 3) {
            destUrl = parts[parts.length - 1];
        } else {
            destUrl = req.originalUrl;
        }
        if (req.originalUrl.endsWith(".css")) {
            destUrl = "/low_bandwidth/css-files/" + destUrl;
            res.redirect(301, destUrl);
        } else if (req.originalUrl.endsWith(".html")) {
            destUrl = "/low_bandwidth/html-files/" + destUrl;
            res.redirect(301, destUrl);
        } else if (req.originalUrl.endsWith(".js")) {
            destUrl = "/low_bandwidth/js-files/" + destUrl;
            res.redirect(301, destUrl);
        } else {
            destUrl = req.originalUrl;
            next();
        }
    } else {
        destUrl = "/" + parts[parts.length - 1]; console.log(parts.length);
        if (parts.length > 3) {
            if (req.originalUrl.endsWith(".css")) {
                destUrl = "/css-files" + destUrl;
                res.redirect(301, destUrl);
            } else if (req.originalUrl.endsWith(".html")) {
                destUrl = destUrl;
                res.redirect(301, destUrl);
            } else if (req.originalUrl.endsWith(".js")) {
                destUrl = "/js-files" + destUrl;
                res.redirect(301, destUrl);
            } else if (req.originalUrl.endsWith(".jpeg") || req.originalUrl.endsWith(".jpg") || req.originalUrl.endsWith(".png")) {
                destUrl = "/images" + destUrl;
                res.redirect(301, destUrl);
            } else {
                destUrl = req.originalUrl;
                next();
            }
        } else {
            next();
        }
    }
});

app.use(express.static(path.join(__dirname, 'files/html-files')));

// Parse urlencoded bodies (for form data)
app.use(bodyParser.urlencoded({ extended: true }));
// Parse JSON bodies (from requests)
app.use(bodyParser.json());
/////////////////////////////////

app.use('/api', barRouter);
app.use('/api', cocktailRouter);
app.use('/api', userRouter);

app.listen(port, (error) => {
    if (error) {
        console.error(error);
    } else {
        console.log(`Server listening at http://localhost:${port}`)
    }
});