const express = require('express');
const router = express.Router();
const Car = require('../model/Car.js'); // Adjust the path accordingly

// API to add a car
router.route('/add').post(function (req, res) {
    let car = new Car(req.body);
    car.save()
        .then(car => {
            res.status(200).json({ 'status': 'success', 'mssg': 'Car added successfully' });
        })
        .catch(err => {
            res.status(409).send({ 'status': 'failure', 'mssg': 'Unable to save to the database' });
        });
});

// API to get all cars
router.route('/').get(function (req, res) {
    Car.find(function (err, cars) {
        if (err) {
            res.status(400).send({ 'status': 'failure', 'mssg': 'Something went wrong' });
        } else {
            res.status(200).json({ 'status': 'success', 'cars': cars });
        }
    });
});

// API to get a specific car by ID
router.route('/:id').get(function (req, res) {
    let id = req.params.id;
    Car.findById(id, function (err, car) {
        if (err) {
            res.status(400).send({ 'status': 'failure', 'mssg': 'Something went wrong' });
        } else {
            res.status(200).json({ 'status': 'success', 'car': car });
        }
    });
});

// API to update a car
router.route('/update/:id').put(function (req, res) {
    Car.findById(req.params.id, function (err, car) {
        if (!car) {
            res.status(400).send({ 'status': 'failure', 'mssg': 'Unable to find data' });
        } else {
            car.brand = req.body.brand;
            car.model = req.body.model;
            car.year = req.body.year;
            car.color = req.body.color;
            car.price = req.body.price;

            car.save().then(updatedCar => {
                res.status(200).json({ 'status': 'success', 'mssg': 'Update complete', 'car': updatedCar });
            });
        }
    });
});

// API for deleting a car
router.route('/delete/:id').delete(function (req, res) {
    Car.findByIdAndRemove({ _id: req.params.id }, function (err) {
        if (err) {
            res.status(400).send({ 'status': 'failure', 'mssg': 'Something went wrong' });
        } else {
            res.status(200).json({ 'status': 'success', 'mssg': 'Delete successfully' });
        }
    });
});

module.exports = router;
