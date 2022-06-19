const model = require("../models/bar-model");

class BarController {
    getBars = async (req, res) => {
        res.send(await model.getBars());
    }

    getBar = async (req, res) => {
        res.send(await model.getBar(req.params.id));
    }
}

module.exports = new BarController();