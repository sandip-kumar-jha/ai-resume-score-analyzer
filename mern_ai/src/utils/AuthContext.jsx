import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const login = localStorage.getItem("isLogin");
    const userInfoData = localStorage.getItem("userInfo");

    const [isLogin, setLogin] = useState(login === "true");

    const [userInfo, setUserInfoState] = useState(
        userInfoData ? JSON.parse(userInfoData) : null
    );

    // User info update + localStorage update
    const setUserInfo = (user) => {
        setUserInfoState(user);

        if (user) {
            localStorage.setItem("userInfo", JSON.stringify(user));
        } else {
            localStorage.removeItem("userInfo");
        }
    };

    // Login update
    const handleSetLogin = (value) => {
        setLogin(value);

        localStorage.setItem(
            "isLogin",
            value ? "true" : "false"
        );
    };

    return (
        <AuthContext.Provider
            value={{
                isLogin,
                setLogin: handleSetLogin,
                userInfo,
                setUserInfo,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;