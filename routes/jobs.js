const express = require("express");
const Job = require("../models/Job");

const router = express.Router();

// Add Job
router.post("/add", async (req, res) => {
    try {
        const { title, company, location, description,vacancies } = req.body;

        const job = new Job({
            title,
            company,
            location,
            description,
            vacancies

        });

        await job.save();

        res.json({
            message: "Job Posted Successfully"
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

// Get All Jobs
router.get("/", async (req, res) => {
    const jobs = await Job.find();
    res.json(jobs);
});

module.exports = router;
