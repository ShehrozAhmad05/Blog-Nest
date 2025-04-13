const express = require('express');
const isAuthenticated = require('../../middlewares/isAuthenticated');
const planController = require('../../controllers/plan/planController');

//create instance express router
const planRouter = express.Router();

//Create a plan
planRouter.post("/create", isAuthenticated, planController.createPlan);

//Get all Plans
planRouter.get("/", planController.lists);

//update a plan
planRouter.put("/:planId",isAuthenticated, planController.update);

//get a plan
planRouter.get("/:planId", planController.getPlan);

//delete a plan
planRouter.delete("/:planId",isAuthenticated, planController.delete);

module.exports = planRouter;