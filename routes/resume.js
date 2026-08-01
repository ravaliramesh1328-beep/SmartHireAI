const express = require("express");
const multer = require("multer");
const Resume = require("../models/Resume");

const router = express.Router();

const storage = multer.diskStorage({
    destination: "./uploads",
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

router.post("/upload", upload.single("resume"), async (req, res) => {

console.log("Upload request received");
console.log(req.body);
console.log(req.file);
    try {
        const { candidateName, email } = req.body;

        const resume = new Resume({
            candidateName,
            email,
            fileName: req.file.originalname,
            filePath: req.file.path
        });

        await resume.save();

        res.json({
            message: "Resume Uploaded Successfully"
        });

    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

// Get all uploaded resumes
router.get("/", async (req, res) => {
    try {
        const resumes = await Resume.find();
        res.json(resumes);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});
module.exports = router;
