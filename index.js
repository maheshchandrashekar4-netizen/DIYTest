import express from "express";

const app = express();
app.use(express.json());

// (Optional) If you later add a /public folder with files, this will serve them.
// Example: public/index.html => https://your-app.onrender.com/index.html
app.use(express.static("public"));

// Journey Builder UI (matches your configTab url: https://diytest-2.onrender.com/ui)
app.get("/ui", (req, res) => {
  res.type("html").send(`<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Chandra's Test Activity</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/postmonger/0.0.15/postmonger.min.js"></script>
  <style>
    body { font-family: Arial, sans-serif; padding: 20px; }
    .title { font-size: 14px; font-weight: bold; margin-bottom: 10px; }
  </style>
</head>
<body>
  <div class="title">Chandra's Test Activity</div>
  <p>If you see this, your custom activity UI is rendering in Journey Builder.</p>

  <script>
    var session = new window.Postmonger.Session();

    session.on("initActivity", function () {
      console.log("UI Initialized");
      // IMPORTANT: enable Next so you can close/save
      session.trigger("updateButton", { button: "next", enabled: true });
    });

    session.on("clickedNext", function () {
      // Tells Journey Builder we're done with the config UI
      session.trigger("readyToComplete");
    });

    session.trigger("ready");
  </script>
</body>
</html>`);
});

// Required lifecycle endpoints
app.post("/validate", (req, res) => res.json({ success: true }));
app.post("/publish", (req, res) => res.json({ success: true }));
app.post("/stop", (req, res) => res.json({ success: true }));

// Runtime execute endpoint (no-op)
app.post("/execute", (req, res) => res.json({ success: true, outArguments: [] }));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}`));
