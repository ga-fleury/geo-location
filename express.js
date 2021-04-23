const express = require("express");
const Datastore = require("nedb");

const app = express();
app.listen(3000, () => console.log("bravo six listening at 3000"));
app.use(express.static("public"));

app.use(express.json({ limit: "1mb" }));

const database = new Datastore("database.db");
database.loadDatabase();

app.post("/api", (request, response) => {
  console.log("request incoming");
  console.log(request.body);

  const timestamp = Date.now();
  request.body.timestamp = timestamp;

  database.insert(request.body);
  response.json({
    status: "success",
    timestamp: request.body.timestamp,
    latitude: request.body.lat,
    longitude: request.body.lon,
  });
});

/*
TODO:
HAVE USER SEND LOCATION DATA TO SERVER
LOG LOCATION DATA USING NEDB
TEST WITH FAKE DB
*/
