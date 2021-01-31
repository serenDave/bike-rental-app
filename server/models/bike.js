const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 0,
        required: true
    },
    bikeType: {
        type: String,
        enum: ['road', 'mountain', 'city', 'custom'],
        required: true
    },
    rentPrice: {
        type: Number,
        min: 0,
        required: true
    },
    rented: {
        type: Boolean,
        default: false
    }
}, {
    toObject: { getters: true, virtuals: true },
    toJSON: { getters: true, virtuals: true }
});

const Bike = mongoose.model('Bike', bikeSchema);

module.exports = Bike;