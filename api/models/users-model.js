const fetch = require("node-fetch");
var express = require('express');
const fs = require('fs');
const path = require("path");
const { URL, URLSearchParams } = require('url');
const editJsonFile = require("edit-json-file");

class User {
    constructor(firstName, lastName, email, password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }
}

class UserModel {
    static USER_ID = 0;

    constructor() {
        this.users = new Map();
    }

    addUser() {
        var rawdata = fs.readFileSync("./files/db/users.json");
        var usersJson = JSON.parse(rawdata);
        for (var i = 0; i < usersJson.users.length; i++){
                usersJson.users[i].id = UserModel.USER_ID++;
                this.users.set(usersJson.users[i].id , usersJson.users[i]);
        }
    }

    checkUser(username){
        let registered = false;
        var rawdata = fs.readFileSync("./files/db/users.json");
        var usersJson = JSON.parse(rawdata);
        for (var i = 0; i < usersJson.users.length; i++){
            if (usersJson.users[i].email == username){
                registered = true;
                break;
            }
        }
        return registered;
    }

    getUsers() {
        return Array.from(this.users);
    }

    register(obj){  
        if (this.checkUser(obj.email) == true){
            UserModel.USER_ID++;
            // If the file doesn't exist, the content will be an empty object by default.
            let file = editJsonFile(`./files/db/users.json`);
            
            file.append("users", {firstName: obj.firstName, lastName: obj.lastName, email: obj.email, password: obj.password, id: UserModel.USER_ID});
            
            //if you want to remove the last element from an array use pop
            //file.pop("classes")
            
            // Save the data to the disk
            file.save();
        }
    }
}

const model = new UserModel();
model.addUser();

module.exports = model;