const express = require("express");
const blogController = require("../controllers/blogController");

const router = express.Router();

//blog Routes
router.get("/", blogController.blog_index);
router.post("/", blogController.blog_create_post);
router.get("/create", blogController.blog_create_get);
router.get("/:id", blogController.blog_details); //Using route parameters to grab id of single blog and use it to get details
router.delete("/:id", blogController.blog_delete);

module.exports = router;
