import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.REACT_APP_MONGO_CON_KEY;

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
