const express = require("express");
const Application = require("../models/Application");

const router = express.Router();

// Apply for a Job
router.post("/apply", async (req, res) => {
    try {
        const { jobId, candidateName, email } = req.body;

        const application = new Application({
            jobId,
            candidateName,
            email
        });

        await application.save();

        res.json({
            message: "Application Submitted Successfully"
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

// Get all applications
router.get("/", async (req, res) => {
    const applications = await Application.find().populate("jobId");
    res.json(applications);
});
// Update Application Status
router.put("/status/:id", async (req, res) => {
    try {
        const { status } = req.body;

        const application = await Application.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        res.json({
            message: "Status Updated Successfully",
            application
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});
// Get applications by email
router.get("/:email", async (req, res) => {
    try {
        const applications = await Application.find({
            email: req.params.email
        }).populate("jobId");

        res.json(applications);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});
module.exports = router;
