const express = require("express");
const Datastore = require("nedb");

const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("bravo six listening in");
});
app.use(express.static("public"));

app.use(express.json({ limit: "1mb" }));

const database = new Datastore("database.db");
database.loadDatabase();

app.get("/api", (request, response) => {
  database.find({}, (err, data) => {
    if (err) {
      response.end();
      return;
    }
    response.json(data);
  });
});

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
