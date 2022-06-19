const model = require("../models/users-model");

class UserController {
    registerUser = async (req, res) => {
        const username = req.body.email;
        var user = await model.alreadyRegistered(username);

        console.log(user);
        if (user){
            return res.status(400).send("User already exists");
        }

        user = await model.register(req.body);
        //req.session.email = username;
        return res.redirect("/index.html");
    }

    loginUser = async (req, res) => {
        const username = req.body.email;
        const password = req.body.password;
        var user = await model.getUser(username);

        if (!user){
            return res.status(400).send("Es existiert kein User mit diesem Namen");
        }

        var correct = await model.checkPassword(password, user);

        if (!correct){
            return res.status(401).send("Password stimmt nicht");
        }

        req.session = username;

        return res.redirect("/index.html");
    }
}

module.exports = new UserController();