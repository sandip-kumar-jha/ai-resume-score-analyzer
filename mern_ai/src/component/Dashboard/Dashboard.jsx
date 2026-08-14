import styles from "./Dashboard.module.css";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import Skeleton from "@mui/material/Skeleton";
import WithAuthHOC from "../../utils/HOC/withAuthHOC";
import { useState, useContext } from "react";
import axios from "../../utils/axios";
import { AuthContext } from "../../utils/AuthContext";

const Dashboard = () => {
    const [uploadFiletext, setUploadFileText] =
        useState("Upload your resume");

    const [loading, setLoading] = useState(false);
    const [resumeFile, setResumeFile] = useState(null);
    const [jobDesc, setJobDesc] = useState("");
    const [result, setResult] = useState(null);

    const { userInfo } = useContext(AuthContext);

    // =========================
    // PDF SELECT
    // =========================
    const handleOnChangeFile = (e) => {
        const file = e.target.files?.[0];

        if (!file) {
            return;
        }

        // Only PDF
        if (
            file.type !== "application/pdf" &&
            !file.name.toLowerCase().endsWith(".pdf")
        ) {
            alert("Only PDF resume is allowed.");
            e.target.value = "";
            return;
        }

        // Optional file size check - 5MB
        if (file.size > 5 * 1024 * 1024) {
            alert("PDF size should be less than 5MB.");
            e.target.value = "";
            return;
        }

        setResumeFile(file);
        setUploadFileText(file.name);
        setResult(null);
    };

    // =========================
    // ANALYZE RESUME
    // =========================
    const handleUpload = async () => {
        if (!resumeFile) {
            alert("Please upload your resume first.");
            return;
        }

        if (!jobDesc.trim()) {
            alert("Please enter the job description.");
            return;
        }

        if (!userInfo?._id) {
            console.log("User info:", userInfo);

            alert(
                "User information not found. Please logout and login again."
            );

            return;
        }

        try {
            setLoading(true);
            setResult(null);

            const formData = new FormData();

            // IMPORTANT:
            // Backend multer expects field name "resume"
            formData.append("resume", resumeFile);

            // Backend expects job_desc
            formData.append("job_desc", jobDesc.trim());

            // MongoDB user _id
            formData.append("user", userInfo._id);

            console.log("Sending resume:", resumeFile.name);
            console.log("User ID:", userInfo._id);

            const response = await axios.post(
                "/api/resume/addResume",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log("Resume API response:", response.data);

            if (response.data?.data) {
                setResult(response.data.data);
            } else {
                alert("Resume analysis completed but no result received.");
            }

        } catch (error) {
            console.error(
                "Resume analysis error:",
                error.response?.data || error
            );

            const message =
                error.response?.data?.message ||
                error.response?.data?.error ||
                "Something went wrong while analyzing your resume.";

            alert(message);

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.Dashboard}>

            {/* ================= LEFT ================= */}

            <div className={styles.DashboardLeft}>

                <div className={styles.DashboardHeader}>

                    <h1>Resume Score Analyzer</h1>

                    <p>
                        Upload your resume and compare it with a job
                        description using AI.
                    </p>

                </div>

                <div className={styles.alertInfo}>

                    <strong>AI Resume Analysis</strong>

                    <p>
                        Get your resume score, skill match and improvement
                        suggestions based on the job description.
                    </p>

                </div>

                {/* ================= PDF UPLOAD ================= */}

                <div className={styles.DashboardUploadResume}>

                    <label htmlFor="resumeUpload">

                        <div>

                            <CreditScoreIcon
                                sx={{ fontSize: 40 }}
                            />

                            <h3>
                                {uploadFiletext}
                            </h3>

                            <p>
                                Upload PDF resume only
                            </p>

                        </div>

                    </label>

                    <input
                        id="resumeUpload"
                        type="file"
                        accept="application/pdf,.pdf"
                        onChange={handleOnChangeFile}
                    />

                </div>

                {/* ================= JOB DESCRIPTION ================= */}

                <div className={styles.jobDesc}>

                    <textarea
                        value={jobDesc}
                        onChange={(e) =>
                            setJobDesc(e.target.value)
                        }
                        className={styles.textArea}
                        placeholder="Paste Your Job Description"
                        rows={10}
                    />

                    <div
                        className={styles.AnalyzeBtn}
                        onClick={!loading ? handleUpload : undefined}
                    >
                        {loading
                            ? "Analyzing..."
                            : "Analyze"}
                    </div>

                </div>

            </div>

            {/* ================= RIGHT ================= */}

            <div className={styles.DashboardRight}>

                {/* USER CARD */}

                <div className={styles.DashboardRightTopCard}>

                    <div>
                        Analyze With AI
                    </div>

                    {userInfo?.photoUrl ? (

                        <img
                            className={styles.profileImg}
                            src={userInfo.photoUrl}
                            alt="Profile"
                        />

                    ) : (

                        <div className={styles.profileImg}>
                            👤
                        </div>

                    )}

                    <h2>
                        {userInfo?.name || "User"}
                    </h2>

                    <p>
                        AI-powered Resume Screening
                    </p>

                </div>

                {/* LOADING */}

                {loading && (

                    <Skeleton
                        variant="rectangular"
                        sx={{
                            borderRadius: "20px"
                        }}
                        width={280}
                        height={280}
                    />

                )}

                {/* RESULT */}

                {result && !loading && (

                    <div
                        className={
                            styles.DashboardRightTopCard
                        }
                    >

                        <div>
                            Resume Analysis Result
                        </div>

                        <div
                            className={
                                styles.cardPercentage
                            }
                        >
                            {result.score}%
                        </div>

                        <p>
                            <strong>
                                Resume:
                            </strong>{" "}
                            {result.resume_name}
                        </p>

                        <p>
                            <strong>
                                Score:
                            </strong>{" "}
                            {result.score}%
                        </p>

                        <p>
                            <strong>
                                Feedback:
                            </strong>{" "}
                            {result.feedback}
                        </p>

                    </div>

                )}

            </div>

        </div>
    );
};

export default WithAuthHOC(Dashboard);