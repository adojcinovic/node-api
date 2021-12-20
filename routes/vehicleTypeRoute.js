const express = require("express");
const vehicleModel = require("../models/vehicleTypeModel");
const router = express.Router();

router.use(express.json());

router.get("/", async (request, response) => {
  const vehicleType = await vehicleModel.find({});

  try {
    response.status(200).send(vehicleType);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.post("/", async (request, response) => {
  const vehicleType = new vehicleModel(request.body);

  try {
    await vehicleType.save();
    response.status(201).send(vehicleType);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.get("/:id", async (request, response) => {
  const vehicleType = await vehicleModel.findById(request.params.id);

  try {
    response.status(200).send(vehicleType);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.patch("/:id", async (request, response) => {
  const updatedVehicleTypeData = {
    updatedAt: Date.now(),
    ...request.body,
  };

  const vehicleType = await vehicleModel.findByIdAndUpdate(
    request.params.id,
    updatedVehicleTypeData,
    {
      new: true,
    }
  );

  try {
    response.status(200).send(vehicleType);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.delete('/:id', async (request, response) => {
  const deletedVehicleType = await vehicleModel.findByIdAndDelete(request.params.id)

  try {
    response.status(200).send(deletedVehicleType);
  } catch (error) {
    response.status(500).send(error);
  }
})

module.exports = router;
