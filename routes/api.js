const express = require("express");
const router = express.Router();

const stationsRouter = require("./controller/stations/index");
const tripsRouter = require("./controller/trips/index");
const usersRouter = require("./controller/users/index");
const ticketsRouter = require("./controller/tickets/index");

router.use("/stations", stationsRouter);
router.use("/trips", tripsRouter);
router.use("/users", usersRouter);
router.use("/tickets", ticketsRouter);

module.exports = router;
