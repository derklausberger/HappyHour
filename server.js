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
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

app.post('/user', (req, res) => {
    if (!req.session.user) {
        return res.status(301).redirect('/error.html');
    } else {
        return res.send({user: req.session.user});
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy();
    return res.status(200).redirect('/home.html');
})

///////////////////////////////////
const path = require('path');
const bodyParser = require('body-parser');

// Serving static files from folder 'files' 
app.use(express.static(path.join(__dirname, 'files')));
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