const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

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

app.post("/execute", async (req, res) => {
    try {
        console.log("⚡ Execute triggered from Journey Builder");

        const token = await getAccessToken();
        console.log("✔ Got SFMC Access Token");

        // Fetch rows from DE for testing
        const rows = await fetchDERecords(token);
        console.log("📥 Retrieved rows from DE:", JSON.stringify(rows));

        // Example output back to journey
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

// Required for Custom Activity
app.get("/config.json", (req, res) => {
    res.sendFile(__dirname + "/config.json");
});

app.get("/ui.html", (req, res) => {
    res.sendFile(__dirname + "/ui.html");
});

app.post("/save", (req, res) => res.json({ status: "saved" }));
app.post("/publish", (req, res) => res.json({ status: "published" }));

app.listen(3000, () => console.log("Server running on port 3000"));
