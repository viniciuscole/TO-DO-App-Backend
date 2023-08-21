const routes = require("express").Router();
const mongoose = require("mongoose");
const taskController = require("../controllers/taskController");

routes.get("/", taskController.getTasks);

module.exports = routes;


