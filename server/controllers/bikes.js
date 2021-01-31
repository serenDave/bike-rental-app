const Bike = require('../models/bike');
const generateSuccessMessage = require('../responses/ok');

exports.getAllBikes = async (req, res) => {
    const bikes = await Bike.find();
    res.status(200).json(generateSuccessMessage(bikes));
};

exports.getOneBike = async (req ,res) => {
    const bike = await Bike.findById(req.params.id);
    res.status(200).json(generateSuccessMessage(bike));
};

exports.createBike = async (req, res) => {
    const bike = await Bike.create(req.body);
    res.status(200).json(generateSuccessMessage(bike, 'Bike successfully created'));
}

exports.updateBike = async (req, res) => {
    const updatedBike = await Bike.findByIdAndUpdate(req.params.id, req.body, {
        runValidators: true,
        new: true
    });

    res.status(200).json(generateSuccessMessage(updatedBike, 'Bike updated'));
};

exports.deleteBike = async (req, res) => {
    await Bike.findByIdAndDelete(req.params.id);
    res.status(204).json(generateSuccessMessage(null, 'Bike deleted'));
};