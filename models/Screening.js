const mongoose = require("mongoose");

const screeningSchema = new mongoose.Schema({
    candidateName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    matchScore: {
        type: Number,
        required: true
    },
    matchedSkills: {
        type: [String],
        default: []
    },
    missingSkills: {
        type: [String],
        default: []
    },
    result: {
        type: String,
        default: "Pending"
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Screening", screeningSchema);
