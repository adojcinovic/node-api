const mongoose = require("mongoose");

const RentalSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
    default: Date.now,
  },
  customer: {
    type: String,
    required: true,
  },
  car: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
  },
});

const Rental = mongoose.model("Rental", RentalSchema);

module.exports = Rental;
