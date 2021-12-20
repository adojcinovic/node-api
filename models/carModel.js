const mongoose = require("mongoose");

const CarSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  vehicleType: String,
  brand: {
    type: String,
    maxlength: [10, 'Maximum brand name is 10 characters']
  },
  model: {
    type: String,
    maxlength: [10, 'Maximum model name is 10 characters']
  },
  constructionYear: {
    type: Number,
    min: [2010, 'We dont use cars older than 2010'],
    max: [2021, 'We dont use cars from future'] 
  },
  fuelType: String,
  numberOfSeats: {
    type: Number,
    min : [1, 'A car must have at least one seat']
  },
  picture: String,
  pricePerDay: {
    type: Number,
    min: [1, 'A price cannot be negative number']
  },
  count: {
    type: Number,
    min: [0, 'There must be at least one instance of this car']
  },
});

const Car = mongoose.model("Car", CarSchema);

module.exports = Car;
