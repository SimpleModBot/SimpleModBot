const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    userID: String,
    testObject: { type: Number, default: 0 },
    item1: { type: Number, default: 0 },
    item2: { type: Number, default: 0 },
    item3: { type: Number, default: 0 },
    item4: { type: Number, default: 0 },
    item5: { type: Number, default: 0 },
    item6: { type: Number, default: 0 },
    item7: { type: Number, default: 0 },
    item8: { type: Number, default: 0 },
    item9: { type: Number, default: 0 },
    item10: { type: Number, default: 0 },
    item11: { type: Number, default: 0 },
    item12: { type: Number, default: 0 },
    item13: { type: Number, default: 0 },
    item14: { type: Number, default: 0 },
    item15: { type: Number, default: 0 },
    item16: { type: Number, default: 0 },
    item17: { type: Number, default: 0 },
    item18: { type: Number, default: 0 },
    item19: { type: Number, default: 0 },
    item20: { type: Number, default: 0 },
});

module.exports = new mongoose.model('Inventory', inventorySchema, 'Inventories');