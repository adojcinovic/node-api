const moment = require("moment");

function checkForDiscount(carPrice, startDate, endDate) {
  let price = carPrice;

  startDate = moment(startDate).format("YYYY-MM-DD");
  endDate = moment(endDate).format("YYYY-MM-DD");

  const differenceInDays = moment(endDate).diff(moment(startDate), "days");

  if (differenceInDays > 10) {
    price = price - price * 0.1;
  } else if (differenceInDays > 5 && differenceInDays <= 10) {
    price = price - price * 0.07;
  } else if (differenceInDays > 3 && differenceInDays <= 5) {
    price = price - price * 0.05;
  }
  return price;
}

function checkIfVip(rentalEvents, rentalCustomer) {
  const eventsForSelectedCustomer = rentalEvents.filter(
    (event) => event.customer === rentalCustomer._id.toString()
  );
  let count = 0;
  if (eventsForSelectedCustomer.length + 1 >= 3) {
    count = eventsForSelectedCustomer.reduce((acc, event) => {
      if (moment(Date.now()).diff(moment(event.createdAt), "days") <= 60) {
        acc++;
      }
      return acc;
    }, 1);
  }
  if (count >= 3) return true;
  else return false;
}

module.exports = {
  checkForDiscount: checkForDiscount,
  checkIfVip: checkIfVip,
};

function checkIfRentExpired() {
  expiredEvents = rentalEvents.filter((event) => {
    moment(event.endDate) < moment(Date.now());
  });
  expiredEvents.forEach((event) => {
    carModel.findOneAndUpdate(
      { _id: event._id },
      {
        count: count + 1,
      }
    );
  });
}
