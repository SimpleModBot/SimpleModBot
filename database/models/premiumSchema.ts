const mongoose = require("mongoose");

const premiumSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    userID: String,
    premium: Boolean,
});

module.exports = new mongoose.model('Premium', premiumSchema, 'premiums');