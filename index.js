const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve all static files from /public
app.use(express.static(path.join(__dirname, 'public')));

// UI URL for the custom activity
app.get('/ui', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/ui.html'));
});

// Journey Builder Callbacks
app.post('/publish', (req, res) => {
    console.log("Publish called");
    res.sendStatus(200);
});

app.post('/validate', (req, res) => {
    console.log("Validate called");
    res.sendStatus(200);
});

app.post('/stop', (req, res) => {
    console.log("Stop called");
    res.sendStatus(200);
});

app.post('/execute', (req, res) => {
    console.log("Execute payload:", req.body);
    res.json({ success: true });
});

// Default homepage
app.get('/', (req, res) => {
    res.send("Journey Builder Custom Activity Server Running1");
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
