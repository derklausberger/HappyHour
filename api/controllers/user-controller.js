const model = require("../models/users-model");

class UserController {
    registerUser = async (req, res) => {
        const username = req.body.email;
        var user = await model.alreadyRegistered(username);

        if (user){
            return res.status(400).send("User already exists");
        }

        user = await model.register(req.body);
        req.session.user = username;
        return res.redirect("/index.html");
    }

    loginUser = async (req, res) => {
        const username = req.body.email;
        const password = req.body.password;
        
        var user = await model.getUser(username);

        if (!user){
            return res.status(400).send("User with this name does not exist");
        }

        var correct = await model.checkPassword(password, user);

        if (!correct){
            return res.status(401).send("Password is incorrect");
        }

        req.session.user = username;
        req.session.save();
        //next();
        res.end();
    }

    getUser = async (req, res) => {
        res.send(await model.getUser(req.session.user));
    }

    changePw = async (req, res) => {
        var user = await model.getUser(req.session.user);

        if (!user){
            return res.status(400).send("Es existiert kein User mit diesem Namen");
        }

        var changed = await model.changePassword(req.body.password, user);

        if (!changed){
            return res.status(400).send("Something went wrong");
        }

        res.end();
    }
}

module.exports = new UserController();