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
        this.users = [];//new Map();
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

<<<<<<< HEAD
    register(obj) {
        UserModel.USER_ID++;
        // If the file doesn't exist, the content will be an empty object by default.
        let file = editJsonFile(`./files/db/users.json`);
        console.log(obj);
        console.log(Object.assign(new User(), obj));

        
        file.append("users", { firstName: obj.firstName, lastName: obj.lastName, email: obj.email, password: obj.password, id: UserModel.USER_ID });

        //console.log(file.get());

        //if you want to remove the last element from an array use pop
        //file.pop("classes")

        // Save the data to the disk
        file.save();

        // Reload it from the disk
        /*file = editJsonFile(`./files/db/users.json`, {
            autosave: true
        });*/

        // Get one field
        //console.log(file.get("name.first"));
        // => Johnny

        // This will save it to disk
        /*file.set("a.new.field.as.object", {
            hello: "world"
        });*/

        // Output the whole thing
        //console.log(file.toObject());
        // { planet: 'Earth',
        //   name: { first: 'Johnny', last: 'B.' },
        //   is_student: false,
        //   a: { new: { field: [Object] } } }
=======
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
>>>>>>> 3a17ed955b15069036adbf8e89d908af25835714
    }
}

const model = new UserModel();

model.addUser();

module.exports = model;