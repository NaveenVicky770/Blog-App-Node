//Using Express Framework
const express = require("express");
//3rd Party Logger MiddleWare
const morgan = require("morgan");
//mongoose to make mongodb atlas communication easy and better
const mongoose = require("mongoose");

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

app.get("/", (req, res) => {
  const blogs = [
    { title: "Yoshi finds eggs", snippet: "Lorem ipsum dolor sit amet consectetur" },
    { title: "Mario finds stars", snippet: "Lorem ipsum dolor sit amet consectetur" },
    { title: "How to defeat bowser", snippet: "Lorem ipsum dolor sit amet consectetur" },
  ];
  res.render("index", { title: "Home", blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new Blog" });
});

//404 page
app.use((req, res) => {
  // res.status(404).sendFile('./views/404.html',{root:__dirname})
  res.status(404).render("404", { title: "404" });
});
