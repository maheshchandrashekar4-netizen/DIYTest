const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => res.redirect("/ui"));
app.get("/index.html", (req, res) => res.redirect("/ui"));

app.get("/ui", (req, res) => {
  res.send("<h2>Chandra Test Activity UI Working</h2>");
});

app.post("/validate", (req, res) => res.json({ success: true }));
app.post("/publish", (req, res) => res.json({ success: true }));
app.post("/stop", (req, res) => res.json({ success: true }));
app.post("/execute", (req, res) => res.json({ success: true }));

app.listen(process.env.PORT || 3000);
