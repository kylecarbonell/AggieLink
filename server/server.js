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

/**
 * Hashes the string to add security to the password.
 * Uses a simple letter -> ASCII value hash.
 * 
 * New hash password is later stored in the database under the users document
 * 
 * @param {*} str 
 * @returns - hashed version of the password
 */
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

/**
 * Unhashes the given string (password).
 * Uses the reverse algorithm of the hash to view the "real" password
 * 
 * Used to check if 2 passwords are correct during a login.
 * 
 * @param {*} str 
 * @returns - Unhashed password
 */
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

/**
 * Deletes the group from the mongoDB database
 * Uses a query to find group using its ID
 */
app.post("/deleteGroup", async (req, res) => {
  const id = req.body._id;
  console.log(id);
  const col = db.collection("Groups");
  await col.deleteOne({ _id: new ObjectId(id) });
  console.log("DELETED");

  res.status(200).send("GOOD");
});

/**
 * Makes a call to the mongoDB database to get all current 
 * groups that are available.
 * 
 * If given a query, the mongodb collection will return the groups
 * that follow that query.
 * 
 * The query can be the type of group or a search that follows the group event
 */
app.get("/getGroups", async (req, res) => {
  const group = req.query.query;
  const type = req.query.type;
  let find = {};

  // console.log(group);
  // console.log(type);

  if (type == "Group") {
    find = { group_type: group };
  } else {
    find = { event_type: { $regex: group, $options: "i" } };
  }

  // console.log(find);

  const results = await db.collection("Groups").find(find).toArray();

  res.json(results).status(200);
});

/**
 * Adds a new group document to the "Groups" collection
 */
app.post("/postGroup", async (req, res) => {
  let doc = req.body.doc;

  try {
    const col = await db.collection("Groups");

    console.log("HEREHREH");
    console.log(doc);

    //   console.log(doc);
    let result = await col.insertOne(doc);

    res.send(result).status(200);
  } catch (e) {
    res.send(e.message).status(201);
  }
});

/**
 * Makes a call to the mongoDB database, finds the user
 * using the email from the request.
 * 
 * If a user with the email is found, decodes and compares 
 * the password in the database to the password sent through the request
 */
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

/**
 * Adds a new user document to the "users" collection. 
 * 
 * Ensures that the email is not taken, by using a query to search for any
 * existing documents with that email.
 * 
 */
app.post("/createAccount", async (req, res) => {
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

/**
 * Uses the list of emails from the request call.
 *
 * Gets the full data object from the "Users" collection
 * and sends it back to the request call
 */
app.get("/getUser", async (req, res) => {
  // console.log("HERE");
  let doc = req.query.doc.split(",");

  let col = db.collection("Users");
  let fin = [];
  for (let i in doc) {
    let temp = await col.findOne({ email: doc[i] });

    fin.push(temp);
  }

  res.status(200).json(fin);
});

/**
 * Adds user's email to the "Users" array in the group
 */
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

/**
 * Deletes user's email from the "Users" array in the current group
 */
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

/**
 * Makes a call to the "Google Maps API" to make a prediction
 * based on the string passed to the request. The API will return
 * a list of predictions
 *
 * The API is set to search for locations within a 500 meter radius of Davis
 *
 * @params area - represents the search string or the location name to be searched
 */
app.get("/getLoc", async (req, res) => {
  const area = req.query.loc;
  // console.log(area);
  const r = await fetch(
    `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${area}&location=38.5449%2C-121.7405&radius=500&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
  )
    .then(async (result) => {
      // console.log(result.url);
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
