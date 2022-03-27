//Using Express Framework
const express = require("express");
//3rd Party Logger MiddleWare
const morgan = require("morgan");
//mongoose to make mongodb atlas communication easy and better
const mongoose = require("mongoose");
//BLog Model
const Blog = require("./models/blog");
const { render } = require("express/lib/response");

//express app
const app = express();

//connect to mongodb
const dbURI =
  "mongodb+srv://vicky770:test321@blog-site-cluster.3jzby.mongodb.net/Blog-Website-Database?retryWrites=true&w=majority";
mongoose
  .connect(dbURI)
  .then((res) => {
    console.log("Connected to DB");
    //listen for requests after db connection has been made
    app.listen(4556);
  })
  .catch((err) => console.log(err));

//Register View Engine
app.set("view engine", "ejs");

//Static files MiddleWare by express
app.use(express.static("public"));

//logger MiddleWare
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true })); //MiddleWare to accept form data

//Routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//blog Routes
app.get("/blogs", (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All Blogs", blogs: result });
    })
    .catch((err) => {
      res.send(err);
    });
});

app.post("/blogs", (req, res) => {
  const blog = new Blog(req.body);

  blog
    .save()
    .then((result) => {
      res.redirect("/blogs");
    })
    .catch((err) => console.log(err));
});

//Using route parameters to grab id of single blog and use it to get details
app.get("/blogs/:id", (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("details", { blog: result, title: "Blog Details" });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new Blog" });
});

//404 page
app.use((req, res) => {
  // res.status(404).sendFile('./views/404.html',{root:__dirname})
  res.status(404).render("404", { title: "404" });
});
