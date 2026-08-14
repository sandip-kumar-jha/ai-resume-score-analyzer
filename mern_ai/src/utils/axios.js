import axios from "axios";

const instance = axios.create({
    baseURL: "https://ai-resume-score-analyzer.onrender.com",
    withCredentials: true,
});

export default instance;