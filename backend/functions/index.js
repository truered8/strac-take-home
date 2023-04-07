const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express = require("express");
const bodyParser = require("body-parser");

admin.initializeApp(functions.config().firebase);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/event", (req, res) => {
  return res.status(200).json({ status: "success" });
});

exports.webApi = functions.https.onRequest(app);
