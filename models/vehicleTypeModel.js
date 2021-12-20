const mongoose = require("mongoose");

const VehicleTypeSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  name: {
    type: String,
    required: true,
  },
});

const VehicleType = mongoose.model('VehicleType', VehicleTypeSchema)

module.exports = VehicleType;
