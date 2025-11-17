const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
app.use(bodyParser.json());

// Root route
app.get("/", (req, res) => {
    res.send("Journey Builder Custom Activity Server Running");
});

// Get Access Token
async function getAccessToken() {
    const url = `${process.env.SFMC_AUTH_BASE}/v2/token`;

    const payload = {
        grant_type: "client_credentials",
        client_id: process.env.SFMC_CLIENT_ID,
        client_secret: process.env.SFMC_CLIENT_SECRET
    };

    const response = await axios.post(url, payload);
    return response.data.access_token;
}

// Fetch DE Records
async function fetchDERecords(accessToken) {
    const url = `${process.env.SFMC_REST_BASE}/hub/v1/dataevents/key:${process.env.DE_EXTERNAL_KEY}/rowset`;

    const config = {
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        }
    };

    const response = await axios.get(url, config);
    return response.data;
}

// EXECUTE
app.post("/execute", async (req, res) => {
    try {
        console.log("⚡ Execute triggered from Journey Builder");

        const token = await getAccessToken();
        const rows = await fetchDERecords(token);

        res.status(200).json({
            error: false,
            message: "DE data fetched successfully",
            data: rows
        });

    } catch (error) {
        console.error("❌ Execute Error:", error.response?.data || error);
        res.status(500).json({
            error: true,
            message: "DE Fetch Failed",
            detail: error.response?.data || error.message
        });
    }
});

// Config + UI
app.get("/config.json", (req, res) => {
    res.sendFile(path.join(__dirname, "config.json"));
});

app.get("/ui.html", (req, res) => {
    res.sendFile(path.join(__dirname, "ui.html"));
});

// Save / Validate / Publish / Stop
app.post("/save", (req, res) => res.json({ status: "save ok" }));
app.post("/validate", (req, res) => res.json({ status: "validate ok" }));
app.post("/publish", (req, res) => res.json({ status: "publish ok" }));
app.post("/stop", (req, res) => res.json({ status: "stop ok" }));

// Start server
app.listen(3000, () => console.log("Server running on port 3000"));
