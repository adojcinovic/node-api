const fs = require("fs");
const express = require("express");
const carModel = require("../models/carModel");
const vehicleModel = require("../models/vehicleTypeModel");
const router = express.Router();
const upload = require("../multer/multer");
const fuelTypes = ["petrol", "electric", "diesel", "hybrid"];
router.use(express.json());

router.get("/", async (request, response) => {
  const cars = await carModel.find({});

  try {
    response.status(200).send(cars);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.get("/:id", async (request, response) => {
  const car = await carModel.findById(request.params.id);

  try {
    response.status(200).send(car);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.post("/", upload.single("photo"), async (request, response) => {
  const type = await vehicleModel.find({ name: request.body.vehicleType });

  const car = new carModel(request.body);

  if (fuelTypes.includes(request.body.fuelType) && type.length) {
    try {
      if (request.file) {
        car.picture = request.file.path;
      }
      await car.save();
      response.status(201).send(car);
    } catch (error) {
      response.status(500).send(error);
    }
  } else {
    fs.unlink(request.file.path, (error) => {
      if (error) throw error;
      console.log("file successfully deleted");
    });

    response.status(500).send("Unavailable vehicle type or fuel type");
  }
});

router.patch("/:id", async (request, response) => {
  const updatedCarData = {
    updatedAt: Date.now(),
    ...request.body,
  };

  const car = await carModel.findByIdAndUpdate(
    request.params.id,
    updatedCarData,
    {
      new: true,
    }
  );

  try {
    response.status(200).send(car);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.delete("/:id", async (request, response) => {
  const deletedCar = await carModel.findByIdAndDelete(request.params.id);

  fs.unlink(deletedCar.picture, (error) => {
    if (error) throw error;
    console.log("file successfully deleted");
  });

  try {
    response.status(200).send(deletedCar);
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = router;
