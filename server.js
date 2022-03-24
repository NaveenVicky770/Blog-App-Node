//Using just Node
const http = require("http");
const fs = require("fs");
const _ = require("lodash");

const server = http.createServer((req, res) => {
  const num = _.random(0, 20);
  console.log(num);

  console.log("Request made");
  console.log(req.url, req.method);

  res.setHeader("Content-Type", "text/html");
  // res.write("<h1>Hey Naveen</h1>");
  // res.end();

  //Routing mechanism

  let path = "./views/";
  switch (req.url) {
    case "/":
      path += "index.html";
      res.statusCode = 200;
      break;
    case "/about":
      path += "about.html";
      res.statusCode = 200;
      break;
    case "/about-us":
      res.statusCode = 301;
      res.setHeader("Location", "/about");
      res.end();
      break;
    default:
      path += "404.html";
      res.statusCode = 404;
  }

  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.write(data);
      res.end();
    }
  });
});

server.listen(8456, "localhost", () => {
  console.log("Listening on port 8456");
});
