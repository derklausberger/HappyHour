const fetch = require("node-fetch");
var express = require('express');
const fs = require('fs');
const path = require("path");
const { URL, URLSearchParams } = require('url');
const editJsonFile = require("edit-json-file");

class User {
    constructor(id, firstName, lastName, email, password) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }
}

class UserModel {
    static USER_ID = 0;

    constructor() {
        this.users = [];
    }

    addUser() {
        var rawdata = fs.readFileSync("./files/db/users.json");
        var usersJson = JSON.parse(rawdata);
        for (var i = 0; i < usersJson.users.length; i++) {
            //usersJson.users[i].id = UserModel.USER_ID++;
            this.users.push(usersJson.users[i]);
            if (usersJson.users[i].id > UserModel.USER_ID) {
                UserModel.USER_ID = usersJson.users[i].id;
            }
        }
    }

    async alreadyRegistered(username){
        var rawdata = fs.readFileSync("./files/db/users.json");
        var usersJson = JSON.parse(rawdata);
        for (var i = 0; i < usersJson.users.length; i++){
            if (usersJson.users[i].email == username){
                return true;
            }
        }
    }

    getUsers() {
        return Array.from(this.users);
    }

    async register(obj){  
            UserModel.USER_ID++;
            // If the file doesn't exist, the content will be an empty object by default.
            let file = editJsonFile(`./files/db/users.json`);
            
            file.append("users", {firstName: obj.firstName, lastName: obj.lastName, email: obj.email, password: obj.password, id: UserModel.USER_ID});
            
            //if you want to remove the last element from an array use pop
            //file.pop("classes")
            
            // Save the data to the disk
            file.save();
    }

    async getUser (username) {
        var rawdata = fs.readFileSync("./files/db/users.json");
        var usersJson = JSON.parse(rawdata);
        for (var i = 0; i < usersJson.users.length; i++) {
            if (usersJson.users[i].email == username){
                return usersJson.users[i];
            }
        }
    }

    async checkPassword(password, user){
        if (user.password == password){
            return true;
        }
    }

    async changePassword(password, user){
        console.log(password);
        let file = editJsonFile(`./files/db/users.json`);
        file.set("users." + Number(user.id-1) + ".password", password);
        file.save();
        return true;
    }
}

const model = new UserModel();

model.addUser();

module.exports = model;