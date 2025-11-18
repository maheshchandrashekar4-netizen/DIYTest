const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS required for SFMC
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    next();
});

app.options('*', (req, res) => {
    res.sendStatus(200);
});

app.use(bodyParser.json());

// Serve UI files
app.use(express.static(path.join(__dirname, 'public')));

// UI endpoint used by SFMC
app.get('/ui', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/ui.html'));
});

// Lifecycle events
app.post("/save", (req, res) => res.json({status:"saved"}));
app.post("/publish", (req, res) => res.json({status:"published"}));
app.post("/validate", (req, res) => res.json({status:"validated"}));
app.post("/stop", (req, res) => res.json({status:"stopped"}));

app.post("/execute", (req, res) => {
    console.log("Execute called");
    res.json({ success: true });
});

app.get("/", (req, res) => {
    res.send("Journey Builder Custom Activity Server Running");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
