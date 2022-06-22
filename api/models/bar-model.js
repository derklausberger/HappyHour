const fetch = require("node-fetch");
const fs = require('fs');
const path = require("path");
const { URL, URLSearchParams } = require('url');
const convert = require("../convert");

var api_key = fs.readFileSync(path.resolve(__dirname, "../../api_keys.txt"), 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    return data;
}).toString();

class Bar {
    constructor(business_status, geometry, icon, icon_background_color,
        icon_mask_base_uri, name, opening_hours, photos, place_id, plus_code,
        rating, reference, scope, types, user_ratings_total, vicinity) {
        this.name = name;

        this.geometry = geometry;

        let url = new URL('https://maps.googleapis.com/maps/api/place/photo');
        let params = { maxwidth: 400, photo_reference: photos[0].photo_reference, key: api_key };
        url.search = new URLSearchParams(params).toString();
        this.img_url = url.toString();

        this.rating = rating;

        this.place_id = place_id;
        this.user_ratings_total = user_ratings_total;

        this.vicinity = vicinity;
        this.opening_hours = opening_hours;
    }
}

class BarModel {
    constructor() {
        this.bars = { 'bars': [] };
    }

    //load bars from api
    async loadBars(latitude, longitude) {
        try {
            //api url
            const url = new URL('https://maps.googleapis.com/maps/api/place/nearbysearch/json');
            //needed parameters (latitdue and longitude from user)
            const params = { location: latitude + "," + longitude, types: 'bar|night_club', radius: 10000, key: api_key };
            //create url with params
            url.search = new URLSearchParams(params).toString();

            //fetch data
            const response = await fetch(url);

            //if there was a probelem
            if (!response.ok) {
                //throw error
                throw new Error(`HTTP error: ${response.status}`);
            }

            //else return response as json
            return await response.json();
        } catch (err) {
            //catch errors
            console.error(`Fetch problem: ${err.message}`);
        }
    }

    //get bar for specific format (json/xml), latitude and longitude (from user)
    async getBars(format, latitude, longitude) {
        try {
            //wait till all bars are loaded by fetch command above
            await this.loadBars(latitude, longitude).then(bars_json => {
                this.bars.bars = [];
                //then push results into bars array
                for (const b of Array.from(bars_json.results)) {
                    //some bar has no photo
                    if (b.photos == null) {
                        b.photos = [{ photo_reference: null }];
                    }
                    //this.bars.push(bar);
                    //push into array via constructor (only way it worked with this api)
                    this.bars.bars.push(new Bar(
                        b.business_status, b.geometry, b.icon, b.icon_background_color,
                        b.icon_mask_base_uri, b.name, b.opening_hours, b.photos, b.place_id, b.plus_code,
                        b.rating, b.reference, b.scope, b.types, b.user_ratings_total, b.vicinity));
                    //this.bars.push(new Bar(bar.name, bar.photos, bar.place_id));
                }
            });

            //if made request for xml
            if (format === "xml") {
                //convert it to xml
                return convert.toXML(this.bars);
            } else if (format === "json") {
                //else return array
                return this.bars;
            } else {
                //else throw error
                throw new Error('Unknown format.')
            }
        } catch (err) {
            //catch error
            console.error(err);
        }
    }

    //load a bar for specific if
    async loadBar(id) {
        try {
            //as above create url
            const url = new URL('https://maps.googleapis.com/maps/api/place/details/json');
            //and params
            const params = { place_id: id, key: api_key };
            //construct url
            url.search = new URLSearchParams(params).toString();

            //wait for fetch
            const response = await fetch(url)

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            //return response as json
            return await response.json();
        } catch (err) {
            console.error(`Fetch problem: ${err.message}`);
        }
    }
    
    //as above getBars()
    async getBar(id) {
        try {
            let b;
            //wait thill loaded
            await this.loadBar(id).then(bar_json => {
                b = bar_json.result;
                if (b.photos == null) {
                    b.photos = [{ photo_reference: null }];
                }
            });

            //return bar found
            return new Bar(
                b.business_status, b.geometry, b.icon, b.icon_background_color,
                b.icon_mask_base_uri, b.name, b.opening_hours, b.photos, b.place_id, b.plus_code,
                b.rating, b.reference, b.scope, b.types, b.user_ratings_total, b.vicinity);
        } catch (err) {
            //catch error
            console.error(err);
        }
    }
}

const model = new BarModel();

module.exports = model;