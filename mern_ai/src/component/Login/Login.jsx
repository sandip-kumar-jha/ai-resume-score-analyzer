import React, { useContext } from "react";
import styles from "./Login.module.css";

import VpnKeyIcon from "@mui/icons-material/VpnKey";
import GoogleIcon from "@mui/icons-material/Google";

import { auth, provider } from "../../utils/firebase";
import { signInWithPopup } from "firebase/auth";

import { AuthContext } from "../../utils/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";

const Login = () => {
    const { setLogin, setUserInfo } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            // Firebase Google Login
            const result = await signInWithPopup(auth, provider);

            const firebaseUser = result.user;

            // Send Firebase user data to backend
            const response = await axios.post("/api/user", {
                name: firebaseUser.displayName,
                email: firebaseUser.email,
                photoUrl: firebaseUser.photoURL,
            });

            // MongoDB user
            const userData = response.data.user;

            setUserInfo(userData);
            setLogin(true);

            localStorage.setItem("isLogin", "true");
            localStorage.setItem(
                "userInfo",
                JSON.stringify(userData)
            );

            navigate("/dashboard");

        } catch (err) {
            console.log("Login Error:", err);
            alert("Something Went Wrong");
        }
    };

    return (
        <div className={styles.Login}>
            <div className={styles.loginCard}>

                <div className={styles.loginCardTitle}>
                    <h1>Login</h1>
                    <VpnKeyIcon />
                </div>

                <div
                    className={styles.googleBtn}
                    onClick={handleLogin}
                >
                    <GoogleIcon
                        sx={{
                            fontSize: 20,
                            color: "red",
                        }}
                    />

                    Sign in with Google
                </div>

            </div>
        </div>
    );
};

export default Login;