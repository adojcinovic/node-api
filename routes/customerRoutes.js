const express = require("express");
const customerModel = require("../models/customerModel");
const router = express.Router();

router.use(express.json());

router.get("/", async (request, response) => {
  const customers = await customerModel.find({});

  try {
    response.status(200).send(customers);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.get("/:id", async (request, response) => {
  const customer = await customerModel.findById(request.params.id);

  try {
    response.status(200).send(customer);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.post("/", async (request, response) => {
  const customer = new customerModel(request.body);

  try {
    await customer.save();
    response.status(201).send(customer);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.patch("/:id", async (request, response) => {
  const updatedCustomerData = {
    updatedAt: Date.now(),
    ...request.body,
  };

  const customer = await customerModel.findByIdAndUpdate(
    request.params.id,
    updatedCustomerData,
    {
      new: true,
    }
  );

  try {
    response.status(200).send(customer);
  } catch (error) {
    response.status(500).send(error);
  }
});

router.delete("/:id", async (request, response) => {
  const deletedCustomer = await customerModel.findByIdAndDelete(request.params.id);

  try {
    response.status(200).send(deletedCustomer);
  } catch (error) {
    response.status(500).send(error);
  }
});

module.exports = router;
