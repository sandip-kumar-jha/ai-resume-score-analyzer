const ResumeModel = require("../Models/resume");
const pdfParse = require("pdf-parse");
const { CohereClientV2 } = require("cohere-ai");

const cohere = new CohereClientV2({
    token: "z3JqnnwyvNN7oGHjPHpFafrM2F3FeY6mdJxktQFv",
});


// ======================================================
// ADD / ANALYZE RESUME
// ======================================================

exports.addResume = async (req, res) => {
    try {

        console.log("PDF received:", req.file?.originalname);
        console.log("BODY:", req.body);

        const { job_desc, user } = req.body;


        // ---------------- VALIDATION ----------------

        if (!req.file) {
            return res.status(400).json({
                message: "Please upload a resume PDF",
            });
        }

        if (req.file.mimetype !== "application/pdf") {
            return res.status(400).json({
                message: "Only PDF files are allowed",
            });
        }

        if (!job_desc || !job_desc.trim()) {
            return res.status(400).json({
                message: "Please provide Job Description",
            });
        }

        if (!user) {
            return res.status(400).json({
                message: "User ID is required",
            });
        }


        // ---------------- PDF TEXT EXTRACTION ----------------

        const pdfData = await pdfParse(req.file.buffer);

        console.log("PDF text extracted successfully");

        const resumeText = pdfData.text?.trim();

        if (!resumeText) {
            return res.status(400).json({
                message: "Could not extract text from this PDF",
            });
        }


        // ---------------- AI PROMPT ----------------

        const prompt = `
You are a professional AI Resume Screening Assistant.

Compare the candidate resume with the given job description.

RESUME:
${resumeText}

JOB DESCRIPTION:
${job_desc}

Give a realistic match score from 0 to 100.

Return ONLY this format:

Score: XX
Reason: One short professional explanation of the match.

Do not add any other headings.
`;


        // ---------------- COHERE CHAT API ----------------

        const response = await cohere.chat({
            model: "command-a-plus-05-2026",

            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });


        // DEBUG
        console.log(
            "FULL COHERE RESPONSE:",
            JSON.stringify(response, null, 2)
        );


        // ---------------- EXTRACT AI TEXT ----------------

        let result = "";

        if (
            response &&
            response.message &&
            Array.isArray(response.message.content)
        ) {
            result = response.message.content
                .filter((item) => item.type === "text")
                .map((item) => item.text || "")
                .join(" ")
                .trim();
        }


        console.log("AI RESULT:", result);


        // ---------------- EMPTY RESPONSE ----------------

        if (!result) {
            return res.status(500).json({
                message: "AI returned an empty response",
            });
        }


        // ---------------- SCORE ----------------

        const scoreMatch = result.match(
            /Score\s*:\s*(\d{1,3})/i
        );

        let score = 0;

        if (scoreMatch) {
            score = Number(scoreMatch[1]);

            score = Math.min(
                100,
                Math.max(0, score)
            );
        }


        // ---------------- FEEDBACK ----------------

        const reasonMatch = result.match(
            /Reason\s*:\s*([\s\S]*)/i
        );

        let feedback = "";

        if (reasonMatch) {
            feedback = reasonMatch[1].trim();
        } else {
            feedback = result.trim();
        }


        // ---------------- SAVE DATABASE ----------------

        const newResume = new ResumeModel({
            user: user,
            resume_name: req.file.originalname,
            job_desc: job_desc,
            score: score,
            feedback: feedback,
        });

        await newResume.save();


        console.log("Resume saved successfully");


        // ---------------- RESPONSE ----------------

        return res.status(200).json({
            message: "Your resume analysis is ready",

            data: {
                _id: newResume._id,
                user: newResume.user,
                resume_name: newResume.resume_name,
                job_desc: newResume.job_desc,
                score: newResume.score,
                feedback: newResume.feedback,
                createdAt: newResume.createdAt,
            },
        });


    } catch (err) {

        console.error("Resume Error:", err);

        return res.status(500).json({
            error: "Server error",
            message: err.message,
        });
    }
};



// ======================================================
// USER HISTORY
// ======================================================

exports.getAllResumesForUser = async (req, res) => {

    try {

        const { user } = req.params;

        if (!user) {
            return res.status(400).json({
                message: "User ID is required",
            });
        }


        const resumes = await ResumeModel
            .find({ user })
            .sort({ createdAt: -1 });


        return res.status(200).json({
            message: "Resume history fetched successfully",
            data: resumes,
        });


    } catch (err) {

        console.error("History Error:", err);

        return res.status(500).json({
            error: "Server error",
            message: err.message,
        });
    }
};



// ======================================================
// ADMIN - ALL RESUMES
// ======================================================

exports.getResumeForAdmin = async (req, res) => {

    try {

        const resumes = await ResumeModel
            .find()
            .populate("user")
            .sort({ createdAt: -1 });


        return res.status(200).json({
            message: "All resumes fetched successfully",
            data: resumes,
        });


    } catch (err) {

        console.error("Admin Error:", err);

        return res.status(500).json({
            error: "Server error",
            message: err.message,
        });
    }
};