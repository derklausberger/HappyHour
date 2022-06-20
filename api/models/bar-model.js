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
    constructor(business_status, geometry, icon, icon_background_color,
        icon_mask_base_uri, name, opening_hours, photos, place_id, plus_code,
        rating, reference, scope, types, user_ratings_total, vicinity) {
        this.name = name;

        this.geometry = geometry;

        let url = new URL('https://maps.googleapis.com/maps/api/place/photo');
        let params = { maxwidth: 400, photo_reference: photos[0].photo_reference, key: api_key };
        url.search = new URLSearchParams(params).toString();
        this.img_url = url;

        this.rating = rating;

        this.place_id = place_id;
        this.user_ratings_total = user_ratings_total;

        this.vicinity = vicinity;
        this.opening_hours = opening_hours;
    }
}

class BarModel {
    constructor() {
        this.bars = [Bar];
    }

    async loadBars(latitude, longitude) {
        try {
            const url = new URL('https://maps.googleapis.com/maps/api/place/nearbysearch/json');
            const params = { location: latitude + "," + longitude, types: 'bar|night_club', radius: 10000, key: api_key };
            url.search = new URLSearchParams(params).toString();

            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            return await response.json();
        } catch (err) {
            console.error(`Fetch problem: ${err.message}`);
        }
    }

    async getBars(latitude, longitude) {
        try {
            await this.loadBars(latitude, longitude).then(bars_json => {
                this.bars = [];
                for (const b of Array.from(bars_json.results)) {
                    if (b.photos == null) {
                        b.photos = [{ photo_reference: null }];
                    }
                    //this.bars.push(bar);
                    this.bars.push(new Bar(
                        b.business_status, b.geometry, b.icon, b.icon_background_color,
                        b.icon_mask_base_uri, b.name, b.opening_hours, b.photos, b.place_id, b.plus_code,
                        b.rating, b.reference, b.scope, b.types, b.user_ratings_total, b.vicinity));
                    //this.bars.push(new Bar(bar.name, bar.photos, bar.place_id));
                }
            });

            return this.bars;
        } catch (err) {
            console.error(err);
        }
    }

    async loadBar(id) {
        try {
            const url = new URL('https://maps.googleapis.com/maps/api/place/details/json');
            const params = { place_id: id, key: api_key };
            url.search = new URLSearchParams(params).toString();

            const response = await fetch(url)

            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }

            return await response.json();
        } catch (err) {
            console.error(`Fetch problem: ${err.message}`);
        }
    }

    async getBar(id) {
        try {
            let b;
            await this.loadBar(id).then(bar_json => {
                b = bar_json.result;
                if (b.photos == null) {
                    b.photos = [{ photo_reference: null }];
                }
            });

            return new Bar(
                b.business_status, b.geometry, b.icon, b.icon_background_color,
                b.icon_mask_base_uri, b.name, b.opening_hours, b.photos, b.place_id, b.plus_code,
                b.rating, b.reference, b.scope, b.types, b.user_ratings_total, b.vicinity);
        } catch (err) {
            console.error(err);
        }
    }
}

const model = new BarModel();

module.exports = model;