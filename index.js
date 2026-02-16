import express from "express";

const app = express();
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.redirect("/ui");
});

// Journey Builder UI
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
  <p>If you see this, your custom activity UI is rendering.</p>

  <script>
    var session = new window.Postmonger.Session();

    session.on("initActivity", function () {
      session.trigger("updateButton", { button: "next", enabled: true });
    });

    session.on("clickedNext", function () {
      session.trigger("readyToComplete");
    });

    session.trigger("ready");
  </script>
</body>
</html>`);
});

// 🔥 THIS IS THE IMPORTANT ADDITION
app.get("/index.html", (req, res) => {
  res.redirect("/ui");
});

//
