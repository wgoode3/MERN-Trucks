const mongoose = require("mongoose");

module.exports = function(x) {
    mongoose.connect(`mongodb://localhost/${x}`);
    require('../models/truck');
}