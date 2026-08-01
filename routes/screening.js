const express = require("express");
const Screening = require("../models/Screening");

const router = express.Router();

router.post("/analyze", async (req, res) => {
    try {
        const {
            candidateName,
            email,
            jobTitle,
            resumeSkills,
            requiredSkills
        } = req.body;

        const resume = resumeSkills
            .split(",")
            .map(s => s.trim().toLowerCase());

        const required = requiredSkills
            .split(",")
            .map(s => s.trim().toLowerCase());

        const matchedSkills = required.filter(skill =>
            resume.includes(skill)
        );

        const missingSkills = required.filter(skill =>
            !resume.includes(skill)
        );

        const matchScore = Math.round(
            (matchedSkills.length / required.length) * 100
        );

        const result =
            matchScore >= 70 ? "Recommended" : "Not Recommended";

await Screening.findOneAndUpdate(
    { email },
    {
        candidateName,
        email,
        jobTitle,
        matchScore,
        matchedSkills,
        missingSkills,
        result
    },
    {
        upsert: true,
        new: true
    }
);
        res.json({
            matchScore,
            matchedSkills,
            missingSkills,
            result
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});
router.get("/:email", async (req, res) => {
    try {
        const screening = await Screening
            .findOne({ email: req.params.email })
            .sort({ createdAt: -1 });

        if (!screening) {
            return res.status(404).json({
                message: "No screening found"
            });
        }

        console.log("SCREENING RESULT:", screening);

        return res.json(screening);

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});
module.exports = router;
