const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

// UI endpoint
// SFMC will try /ui and /ui/index.html → both work
app.get('/ui', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/ui/index.html'));
});

// Activity Lifecycle
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
