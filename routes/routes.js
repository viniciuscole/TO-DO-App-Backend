const routes = require("express").Router();
const mongoose = require("mongoose");
const listController = require("../controllers/ListController");

routes.get("/", listController.getAllLists);
routes.get("/list/:id", listController.getListById);
routes.get("/list/:id/task", listController.getTasksByListId);
routes.post("/list", listController.createList);
routes.post("/list/:id/task", listController.createTask);
routes.put("/list/:id", listController.updateList);
routes.delete("/list/:id", listController.deleteList);
routes.put("/task/:listId/:taskId/toggle", listController.toggleStatus);
routes.put("/task/:listId/:taskId", listController.updateTask);
routes.delete("/task/:listId/:taskId", listController.deleteTask);

module.exports = routes;


