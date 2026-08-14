const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },

        resume_name: {
            type: String,
            required: true,
        },

        job_desc: {
            type: String,
            required: true,
        },

        score: {
            type: Number,
            min: 0,
            max: 100,
            default: 0,
        },

        feedback: {
            type: String,
            default: "",
        },
    },
    {
        timestamps: true,
    }
);

const ResumeModel = mongoose.model("resume", ResumeSchema);

module.exports = ResumeModel;