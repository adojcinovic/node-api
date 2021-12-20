const express = require("express");
const moment = require("moment");
const rentModel = require("../models/rentModel");
const carModel = require("../models/carModel");
const customerModel = require("../models/customerModel");
const router = express.Router();
const {
  checkIfVip,
  checkForDiscount,
} = require("../utils/rentingEventHandlers");

router.use(express.json());

router.get("/", async (request, response) => {
  const rentalEvents = await rentModel.find({});

  try {
    response.status(200).send(rentalEvents);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.get("/:id", async (request, response) => {
  const rentalEvent = await rentModel.findById(request.params.id);

  try {
    response.status(200).send(rentalEvent);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.post("/", async (request, response) => {
  const rentalEvents = await rentModel.find({});
  const rent = new rentModel(request.body);
  const requestedCar = await carModel.findOne({ _id: request.body.car }).exec();
  const rentalCustomer = await customerModel
    .findOne({ _id: request.body.customer })
    .exec();
  const price = await requestedCar.pricePerDay;

  if (requestedCar && requestedCar.count > 0 && rentalCustomer) {
    const newCarCount = requestedCar.count - 1;
    const requestedCarUpdated = {
      updatedAt: Date.now(),
      count: newCarCount,
    };
    const update = await carModel.findOneAndUpdate(
      { _id: requestedCar._id },
      requestedCarUpdated,
      {
        new: true,
      }
    );

    if (checkIfVip(rentalEvents, rentalCustomer)) {
      rent.price = price - price * 0.15;
    } else {
      rent.price = checkForDiscount(price, rent.startDate, rent.endDate);
    }

    try {
      await rent.save();
      response.status(201).send({ rent, update });
    } catch (error) {
      response.status(500).send(error);
    }
  } else if (!rentalCustomer) {
    response.status(400).send("customer doesn't exist");
  } else {
    response.status(400).send("requested car is unavailable");
  }
});

router.patch("/:id", async (request, response) => {
  const updatedRentData = {
    updatedAt: Date.now(),
    ...request.body,
  };

  const rentalEvent = await rentModel.findByIdAndUpdate(
    request.params.id,
    updatedRentData,
    {
      new: true,
    }
  );
  try {
    response.status(200).send(rentalEvent);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.delete("/:id", async (request, response) => {
  const deletedRentalEvent = await rentModel.findByIdAndDelete(
    request.params.id
  );

  try {
    response.status(200).send(deletedRentalEvent);
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = router;
