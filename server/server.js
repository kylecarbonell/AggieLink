import express from "express";
import cors from "cors";
import http from "http";
import { ObjectId } from "bson";
import { db } from "./mongo.mjs";

import dotenv from "dotenv";

import bodyParser from "body-parser";
// import { GOOGLE_API_KEY } from "../src/Data/GroupData.js";

dotenv.config();

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

app.post("/deleteGroup", async (req, res) => {
  const id = req.body._id;
  console.log(id);
  const col = db.collection("Groups");
  await col.deleteOne({ _id: new ObjectId(id) });
  console.log("DELETED");

  res.status(200).send("GOOD");
});

app.get("/getGroups", async (req, res) => {
  const group = req.query.query;
  let find = {};

  // console.log(group);

  if (group != "undefined" && group != "") {
    find = { group_type: group };
  }

  // console.log(find);

  const results = await db.collection("Groups").find(find).toArray();

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

  if (user != null) {
    console.log(user);
    if (doc.pw == decode(user.pw)) {
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

app.get("/getUser", async (req, res) => {
  // console.log("HERE");
  let doc = req.query.doc.split(",");

  let col = db.collection("Users");
  let fin = [];
  for (let i in doc) {
    let temp = await col.findOne({ email: doc[i] });

    fin.push(temp);
  }

  // console.log(fin);/\
  res.status(200).json(fin);
});

app.post("/addToGroup", async (req, res) => {
  const data = req.body.data;
  const id = new ObjectId(req.body._id);

  console.log(id);
  let col = db.collection("Groups");
  let doc = await col.findOne({ _id: id });
  console.log(doc);

  if (doc.users.includes(data.email)) {
    console.log("CONTAIN");
    res.status(201).send();
    return;
  }

  let update = await col.updateOne(
    { _id: id },
    { $push: { users: data.email } }
  );

  let newDoc = await col.findOne({ _id: id });
  console.log(newDoc.users);

  res.status(200).json(newDoc.users);
});

app.post("/leaveGroup", async (req, res) => {
  const data = req.body.data;
  const id = new ObjectId(req.body._id);

  console.log(id);
  let col = db.collection("Groups");
  let doc = await col.findOne({ _id: id });
  console.log(doc);

  if (!doc.users.includes(data.email)) {
    console.log("Not In Group");
    res.status(201).send();
    return;
  }

  let update = await col.updateOne(
    { _id: id },
    { $pull: { users: data.email } }
  );

  let newDoc = await col.findOne({ _id: id });
  console.log(newDoc.users);

  res.status(200).json(newDoc.users);
});

app.get("/getLoc", async (req, res) => {
  const area = req.query.loc;
  // console.log(area);
  const r = await fetch(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${area}&location=38.5449%2C-121.7405&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
  )
    .then(async (result) => {
      const json = await result.json();
      const pred = json.predictions;
      const temp = [];
      // console.log(pred[0].description);
      let i = 0;
      while (i < 3 && i < pred.length) {
        const loc = pred[i].description.split(",");

        // console.log(
        //   loc[0] + ", " + loc[loc.length - 3] + ", " + loc[loc.length - 2]
        // );

        temp.push([
          loc[0],
          "," + loc[loc.length - 3] + "," + loc[loc.length - 2],
        ]);
        i += 1;
      }

      res.json(temp);
    })
    .catch((e) => {
      console.log(e);
    });

  // res.send();
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
