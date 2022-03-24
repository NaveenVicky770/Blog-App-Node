//Using Express Framework
const express = require("express");

//express app
const app = express();

//Register View Engine
app.set('view engine','ejs')

//listen for requests
app.listen(4556);

app.get("/", (req, res) => {
  //   res.send("<h1>Hey Naveen</h1>");
  // res.sendFile("./views/index.html", { root: __dirname });
  res.render('index')
});

app.get("/about", (req, res) => {
  //   res.send("<h1>Hey Naveen</h1>");
  // res.sendFile("./views/about.html", { root: __dirname });
  res.render('about')
});

//redirects
app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

//404 page
app.use((req,res)=>{
    // res.status(404).sendFile('./views/404.html',{root:__dirname})
    res.status(404).render('404')
})
