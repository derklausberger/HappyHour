const express = require('express');

const barRouter = require('./api/routes/bar-router');
const cocktailRouter = require('./api/routes/cocktail-router');
const userRouter = require('./api/routes/user-router');

const app = express();
const port = process.env.PORT ?? 5500;

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
        console.log(error);
    } else {
        console.log(`Server listening at http://localhost:${port}`)
    }
});