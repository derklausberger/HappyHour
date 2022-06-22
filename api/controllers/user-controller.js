const model = require("../models/users-model");

class UserController {
    registerUser = async (req, res) => {
        //get username
        const username = req.body.email;
        //look up if user is already registered
        var user = await model.alreadyRegistered(username);

        //if user is already registered
        if (user){
            //send errror back
            return res.status(400).send("User already exists");
        }

        //if not registered --> register user
        user = await model.register(req.body);
        //set session for user
        req.session.user = username;
        req.session.save();
        //redirect user to index.html
        return res.redirect("/index.html");
    }

    loginUser = async (req, res) => {
        //get username and password
        const username = req.body.email;
        const password = req.body.password;
        
        //get user related to that username
        var user = await model.getUser(username);

        //if no user was found with that username
        if (!user){
            //return error
            return res.status(400).send("User with this name does not exist");
        }

        //else check if password enterd is password of user
        var correct = await model.checkPassword(password, user);

        //if not correct
        if (!correct){
            //return error
            return res.status(401).send("Password is incorrect");
        }

        //else set session for user
        req.session.user = username;
        req.session.save();
        //end of response
        res.end();
    }

    getUser = async (req, res) => {
        res.send(await model.getUser(req.session.user));
    }

    changePw = async (req, res) => {
        //get user via session (user who wants to change his password)
        var user = await model.getUser(req.session.user);

        //if no user was found
        if (!user){
            //return error
            return res.status(400).send("Es existiert kein User mit diesem Namen");
        }

        //else change password
        var changed = await model.changePassword(req.body.password, user);

        //if something went wrong
        if (!changed){
            //return error
            return res.status(400).send("Something went wrong");
        }

        //else res end
        res.end();
    }
}

module.exports = new UserController();