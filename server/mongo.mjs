import { MongoClient, ServerApiVersion } from "mongodb";
const uri =
  "mongodb+srv://kylecarbonell13:mqDJNOR8OsDdWXeg@aggieproject.gp5g1.mongodb.net/?retryWrites=true&w=majority&appName=AggieProject";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let con = null;
try {
  con = await client.connect();
} catch (e) {
  console.error(e);
}

export const db = con.db("GroupHQ");
