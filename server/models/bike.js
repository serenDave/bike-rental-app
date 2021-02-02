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
    rentTime: {
        type: Number,
        min: 0,
        default: 0,
    },
    rented: {
        type: Boolean,
        default: false
    }
}, {
    toObject: { getters: true, virtuals: true },
    toJSON: { getters: true, virtuals: true }
});

bikeSchema.post('find', async function(docs) {
    if (docs.length) {
        for (const bike of docs) {
            if (bike.rented && bike.rentTime >= 20) {
                bike.rentPrice = (bike.rentPrice / 2).toFixed(2);
            }
        }
    }
});

const Bike = mongoose.model('Bike', bikeSchema);

module.exports = Bike;