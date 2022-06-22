const fetch = require("node-fetch");
var express = require('express');
const fs = require('fs');
const path = require("path");
const { URL, URLSearchParams } = require('url');
const editJsonFile = require("edit-json-file");

class UserModel {
    static USER_ID = 0;

    constructor() {
        this.users = [];
    }

    //add users to model
    addUser() {
        //open .json file
        var rawdata = fs.readFileSync("./files/db/users.json");
        //parse data received from file
        var usersJson = JSON.parse(rawdata);
        //as long as user array goes
        for (var i = 0; i < usersJson.users.length; i++) {
            //push user in user array from model
            this.users.push(usersJson.users[i]);
            //set id
            if (usersJson.users[i].id > UserModel.USER_ID) {
                UserModel.USER_ID = usersJson.users[i].id;
            }
        }
    }

    //check if user is already registered
    async alreadyRegistered(username){
        //get .json file
        var rawdata = fs.readFileSync("./files/db/users.json");
        //parse data
        var usersJson = JSON.parse(rawdata);
        //check user array
        for (var i = 0; i < usersJson.users.length; i++){
            //if a user with that username is found
            if (usersJson.users[i].email == username){
                //return true
                return true;
            }
        }
    }

    //get all users
    getUsers() {
        return Array.from(this.users);
    }

    //register a user
    async register(obj){  
            UserModel.USER_ID++;
            // If the file doesn't exist, the content will be an empty object by default.
            let file = editJsonFile(`./files/db/users.json`);
            
            //append file with new data
            file.append("users", {firstName: obj.firstName, lastName: obj.lastName, email: obj.email, password: obj.password, id: UserModel.USER_ID});
            
            // Save the data to the disk
            file.save();
    }

    //get one specific user via username
    async getUser (username) {
        //open .json file
        var rawdata = fs.readFileSync("./files/db/users.json");
        //parse data
        var usersJson = JSON.parse(rawdata);
        //look through all users
        for (var i = 0; i < usersJson.users.length; i++) {
            //if user was found
            if (usersJson.users[i].email == username){
                //return user
                return usersJson.users[i];
            }
        }
    }

    //check if password is valid
    async checkPassword(password, user){
        //check if user password matches given password
        if (user.password == password){
            //return true
            return true;
        }
    }

    //change password from specific user
    async changePassword(password, user){
        //open .json
        let file = editJsonFile(`./files/db/users.json`);
        //set new password for user at specific id
        file.set("users." + Number(user.id-1) + ".password", password);
        //save
        file.save();
        //return true
        return true;
    }
}

const model = new UserModel();

model.addUser();

module.exports = model;