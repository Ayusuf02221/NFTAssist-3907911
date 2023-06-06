const express = require("express");
const bodyParser  = require("body-parser");
const MongoClient = require('mongodb').MongoClient;
const Users = require("./modals/users")

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


const uri = "mongodb+srv://yusufa30:Maplefiedl456@nftassist.4c9pbgb.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true });
client.connect(err => {
  const items = JSON.stringify(client.db("NFTAssist").collection("Users"));

  
  app.get("/", (req, res) => {
    res.json({"foo": "bar"});
  });
  
})
// enable cross-origin resource sharing
app
  .use(function(req, res, next) {
    res.header("Access-Control-Allow-Credentials", true);
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header(
      "Access-Control-Allow-Methods",
      "GET,HEAD,PUT,PATCH,POST,DELETE"
    );
    next();
  })
  .options("*", function(req, res, next) {
    res.end();
  });

//redirect www to non-www
app.all("/*", function(req, res, next) {
  if (req.headers.host.match(/^www/) !== null) {
    res.redirect(
      api.config.method + req.headers.host.replace(/^www\./, "") + req.url
    );
  } else {
    next();
  }
});


app.post("/login", (req, res) => {
    const {email,password} = req.body.data;
    console.log(email,password);
    if (email=="a" && password !=="a"){
       return res.status(400).send({
          success: "false",
          message: "Incorrect Password",
        });
    }
    if (email=="a" && password =="a"){
    return res.status(200).send({
      success: "true",
      message: "Successful Login",
    });
    }
    return res.status(400).send({
        success: "false",
        message: "Incorrect Login Credentials",
      });
});

app.post("/network/v1/users", (req, res) => {
    if (!req.body.name) {
      return res.status(400).send({
        success: "false",
        message: "name is required"
      });
    } else if (!req.body.password) {
      return res.status(400).send({
        success: "false",
        message: "password is required"
      });
    }
    const user = {
      id: db_users.length + 1,
      name: req.body.name,
      password: req.body.password
    };
    db_users.push(user);
    return res.status(201).send({
      success: "true",
      message: "user added successfully",
      user
    });
  });

const PORT = 5001;
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
  });