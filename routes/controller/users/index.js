const express = require("express");
const router = express.Router();

const { createUser, login } = require("./users");

router.post("/", createUser);
router.post("/login", login);

module.exports = router;
