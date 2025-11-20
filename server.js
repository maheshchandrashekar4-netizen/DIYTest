const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve all files inside /public
app.use(express.static(path.join(__dirname, "public")));

// Serve config.json from root
app.get("/config.json", (req, res) => {
  res.sendFile(path.join(__dirname, "config.json"));
});

// UI endpoint
app.get("/ui", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "ui.html"));
});

// SFMC API required endpoints
app.post("/save", (req, res) => {
  res.send({ message: "Save OK" });
});

app.post("/publish", (req, res) => {
  res.send({ message: "Publish OK" });
});

app.post("/validate", (req, res) => {
  res.send({ message: "Validate OK" });
});

app.post("/stop", (req, res) => {
  res.send({ message: "Stop OK" });
});

// Root route
app.get("/", (req, res) => {
  res.send("Custom Activity Server Running");
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server running on port " + port));
