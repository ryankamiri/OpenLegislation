const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// billId, title, congressId, latestAction, originChamber, updateDate, url

const billSchema = new Schema({
    billId: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    congressId: {
        type: Number,
        required: true,
    },
    latestAction: {
        actionDate: {
            type: Date,
            required: false,
        },
        text: {
            type: String,
            required: false,
        }
    },
    originChamber: {
        type: String,
        required: true,
    },
    updateDate: {
        type: Date,
        required: true,
    },
    url: {
        type: String,
        required: true
    }
}, {
    timestamps: true,
});

const Bill = mongoose.model('Bill', billSchema);

module.exports = Bill;