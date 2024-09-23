import express from "express";
import cors from "cors";
import http from "http";
import { db } from "./mongo.mjs";

import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

const encode = (str) => {
  let i = 0;
  let hashString = "";
  while (i < str.length) {
    const code = str.charCodeAt(i);
    hashString += code.toString() + "$";

    i += 1;
  }

  console.log(hashString);
  return hashString;
};

const decode = (str) => {
  let i = 0;
  let letter = "";
  let password = "";
  while (i < str.length) {
    if (str[i] == "$") {
      password += String.fromCharCode(Number.parseInt(letter));
      letter = "";
    } else {
      letter += str[i];
    }

    i += 1;
  }

  return password;
};

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
  let doc = JSON.parse(req.query.data);

  const col = await db.collection("Users");
  console.log(col);

  const user = await col.findOne({ email: doc.email });

  if (user) {
    if (doc.pw == decode(user.password)) {
      console.log("TRUE");
      res.status(200);
    } else {
      res.status(201);
    }
  } else {
    res.status(202);
  }
  res.send(user);
});

app.post("/createAccount", async (req, res) => {
  console.log("HI");
  let doc = req.body.data;
  doc.pw = encode(doc.pw);
  console.log(doc);

  let col = db.collection("Users");

  let check = await col.find({ email: doc.email }).toArray();
  if (check.length > 0) {
    res.status(201).send();
    return;
  }

  let result = await col.insertOne(doc);
  res.send(result).status(200);
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
