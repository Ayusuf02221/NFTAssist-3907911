import mongoose from "mongoose";

const Schema = mongoose.Schema;

const model = new Schema({
  createdAt: {
    type: Date,
    default: Date.now
  },
  token_id: String,
  name: String,
  contract_type: String,
  symbol: String,
  owner_of: String
});

export default mongoose.model("Wishlist", model);
