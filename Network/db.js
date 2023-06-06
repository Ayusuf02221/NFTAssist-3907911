const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://yusufa30:Maplefield456@nftassist.4c9pbgb.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });

export const connection = () => {client.connect(err => {
  const collection = client.db("nftvision").collection("Users");
  // perform actions on the collection object
  client.close();
});
}





