const express = require("express");

const { createTask } = require("../controllers/task");

const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.post("/", isAuth, createTask);

module.exports = router;
