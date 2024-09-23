import express from "express";
import cors from "cors";
import http from "http";
import { db } from "./mongo.mjs";

const app = express();
app.use(cors());

app.get("/getGroups", async (req, res) => {
  const results = await db.collection("Groups").find({}).toArray();
  console.log("GETTING GROUPS");

  //   console.log(results);
  res.json(results).status(200);
});

app.post("/postGroup", async (req, res) => {
  let doc = JSON.parse(req.query.doc);
  const col = await db.collection("Groups");

  //   console.log(doc);
  let result = await col.insertOne(doc);

  res.send(result).status(200);
});

app.get("/getAccount", async (req, res) => {
  let auth = true;
  let doc = JSON.parse(req.query.data);

  console.log(doc);

  if (auth) {
    res.status(200);
  } else {
    res.status(400);
  }
});

async function start() {
  try {
    app.listen(8000, () => {
      console.log("LISTENING 8000");
    });
    // await change.close();
  } catch (e) {
    console.log(e);
  }
}

start();
