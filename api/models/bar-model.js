const fetch = require("node-fetch");
const fs = require('fs');
const path = require("path");
const { URL, URLSearchParams } = require('url');

var api_key = fs.readFileSync(path.resolve(__dirname, "../../api_keys.txt"), 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    return data;
}).toString();

class Bar {
    constructor(name, photos, place_id) {
        this.name = name;

        var url = new URL('https://maps.googleapis.com/maps/api/place/photo');
        var params = { maxwidth: 400, photo_reference: photos[0].photo_reference, key: api_key };

        url.search = new URLSearchParams(params).toString();

        this.img_url = url;

        this.id = place_id;
    }
}

class BarModel {
    constructor() {
        this.bars = new Map();
    }

    addBar(bar) {
        this.bars.set(bar.id, bar);
    }

    

    getBars() {
        return Array.from(this.bars);
    }
}

const model = new BarModel();

var url = new URL('https://maps.googleapis.com/maps/api/place/nearbysearch/json');
var params = { location: '48.210033,16.363449', types: 'bar|night_club', radius: 1500, key: api_key };

url.search = new URLSearchParams(params).toString();

fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
    })
    .then(bars => {
        for (let bar of Array.from(bars.results)) {
            if (bar.photos == null) {
                bar.photos = [{photo_reference:null}];
            }
            model.addBar(new Bar(bar.name, bar.photos, bar.place_id));
        }
    })
    .catch(err => console.error(`Fetch problem: ${err.message}`));

module.exports = model;