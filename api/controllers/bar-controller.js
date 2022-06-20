const model = require("../models/bar-model");

class BarController {
    getBars = async (req, res) => {
        res.send(await model.getBars(req.body.latitude, req.body.longitude));
    }

    getBar = async (req, res) => {
        res.send(await model.getBar(req.params.id));
    }
}

module.exports = new BarController();