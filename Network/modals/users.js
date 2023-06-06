const mongoose = require("mongoose");

const Schema = mongoose.Schema;
// Create a new 'model' object using the 'Schema' constructor
// This model defines the structure of a user document in the MongoDB collection
const model = new Schema({
  username: String,
  password: String,
  wishlist: [
    {
      token_id: String,
      name: String,
      contract_type: String,
      symbol: String,
      owner_of: String
    },
  ],
});
// Export the Mongoose model for the 'Users' collection, allowing other parts
// of the application to interact with the collection using the defined schema
module.exports = mongoose.model("Users", model);
