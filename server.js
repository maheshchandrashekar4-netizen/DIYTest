const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static UI files (ui.html, config.json, icon.png)
app.use(express.static(path.join(__dirname, 'public')));

// Root route — REQUIRED by SFMC (prevents "Cannot GET /")
app.get('/', (req, res) => {
  res.send('Custom Activity Server is running on Render.');
});

// EXECUTE: Journey runs this step
app.post('/execute', (req, res) => {
  console.log("Execute called:", req.body);

  // Return success response
  res.status(200).json({ status: "ok", message: "Execute ran successfully" });
});

// PUBLISH: When journey is published
app.post('/publish', (req, res) => {
  console.log("Publish called");
  res.status(200).send("Publish OK");
});

// VALIDATE: Before saving config in the UI
app.post('/validate', (req, res) => {
  console.log("Validate called");
  res.status(200).send("Validate OK");
});

// STOP: When journey stops
app.post('/stop', (req, res) => {
  console.log("Stop called");
  res.status(200).send("Stop OK");
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
