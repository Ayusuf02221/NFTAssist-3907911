const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const Users = require("./modals/users")

const app = express()
// Connection string to the MongoDB Atlas database
const connectionString = "mongodb+srv://yusufa30:Maplefield456@nftassist.4c9pbgb.mongodb.net/?retryWrites=true&w=majority"

// Connect to the MongoDB database
MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    // Get a reference to the 'NFTAssist' database
    console.log('Connected to Database')
    const db = client.db('NFTAssist')

    // Middleware to parse the body of incoming requests
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use(express.json());

    app.get('/', (req, res) => {
      db.collection('Users').find().toArray()
        .then(users => {
            res.json(users);
        })
        .catch(console.error)
    })

    // Route to handle user login
    app.post("/login", (req, res) => {
      const {username,password} = req.body.data;
      db.collection("Users").find({username:username}).toArray(function(err, result) {
        // Check if username exists and password is correct
        if(result.length === 0 || err){
          res.send({success: "false",errorMsg: "Username does not exist" } )
        }
        else if(result[0].password!==password){
          console.log(result[0].password)
          res.send({success: "false",errorMsg: "Password to that email is incorrect" })
        }
       else{
        res.send({success: "true",successMsg: "Succesful Login" } )
       }
      }); 
    });
    // Route to handle user registration
    app.post("/register", (req, res) => {
      const { username, password } = req.body.data;
      //Check if users exits in the database already
      db.collection("Users").find({ username: username }).toArray(function (err, result) {
        if (result.length !== 0) {
          res.send({ success: "false", errorMsg: "Username Already exists " });
        }
        else {
          const user = {
            username: username,
            password: password,
            wishlist: []
          };
          db.collection("Users").insertOne(user, function (err, result) {
            if (err) {
              res.send({ success: "false", errorMsg: err });
            }
            else {
              res.send({ success: "true", successMsg: "You successfully registered, you may login" });
            }
          });
        }
      });
    });

    app.post("/saveWishlist", (req, res) => {
      console.log("Request body:", req.body); // This will log the entire request body
      console.log("adding to wishlist");
      const { username, nft } = req.body.data;
      console.log('Received NFT:', nft); // This will log the NFT object you received in the request
      const NFTDetail = {
          token_id: nft.token_id,
          name: nft.name,
          contract_type: nft.contract_type,
          symbol: nft.symbol,
          owner_of: nft.owner_of
      };
      console.log('NFTDetail to insert:', NFTDetail); // This will log the NFTDetail object you're about to insert
      db.collection("Users").updateOne( 
          { username : username },
          { $push: { wishlist: NFTDetail } },
          function(err, result) {
              if(err){
                  console.error('Error while updating:', err); // This will log the error if there is one
                  res.send({success: "false",errorMsg: err } )
              }
              else {
                  console.log('Update successful:', result); // This will log the result of the update operation
                  res.send({success: "true",successMsg: "You successfully saved an NFT to your wihslist" } )
              }
          });
  });
  
  app.post("/deleteItem/:username", (req, res) => {
    console.log("deleting from wishlist");
    const {username} = req.params;
    const {item} = req.body.data;  // This is the token_id of the item to be deleted
    console.log(username,item);
    db.collection("Users").updateOne( 
      { username : username },
      { $pull: { wishlist: {token_id: item } }},  // Pull the item with the corresponding token_id
      function(err, result) {
        if(err){
          res.send({success: "false",errorMsg: err } )
        }
        else {
          res.send({success: "true",successMsg: "You successfully removed an NFT from your wishlist " } )
        }
      });
  });

  
  app.get("/wishlistItems/:username", function (req, res) {
    const {username} = req.params;
    db.collection("Users").find({username:username}).toArray().
    then(result => {
      res.json(result[0]);
  })
  .catch(console.error)
})
   
    // ========================
    // Listen
    // ========================
    const PORT = 5001;
    app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
  });
  })
  .catch(console.error)