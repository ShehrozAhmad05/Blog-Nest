const express = require('express');
const isAuthenticated = require('../../middlewares/isAuthenticated');
const categoryController = require('../../controllers/categories/categoryController');


//create instance express router
const categoriesRouter = express.Router();

//Create a category
categoriesRouter.post("/create", isAuthenticated, categoryController.createCategory);

//Get all categories
categoriesRouter.get("/", categoryController.fetchAllCategories);

//update a category
categoriesRouter.put("/:categoryId",isAuthenticated, categoryController.update);

//get a category
categoriesRouter.get("/:categoryId", categoryController.getCategory);

//delete a category
categoriesRouter.delete("/:categoryId",isAuthenticated, categoryController.delete);

module.exports = categoriesRouter;