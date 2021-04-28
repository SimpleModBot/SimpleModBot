const mongoose = require('mongoose');

const balanceSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    userID: String,
    balance: { type: Number, default: 0 },
})

module.exports = new mongoose.model('Balance', balanceSchema, 'balances');