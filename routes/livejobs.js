const express = require("express");
const axios = require("axios");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const response = await axios.get("https://www.arbeitnow.com/api/job-board-api");

        res.json(response.data);
    } catch (err) {
        res.status(500).json({
            message: "Unable to fetch live jobs",
            error: err.message
        });
    }
});

module.exports = router;
