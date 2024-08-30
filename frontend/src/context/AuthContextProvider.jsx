import { useState } from "react";
import AuthContext from "./AuthContext"

const AuthContextProvider = ({ children }) => {
    const [userData, setUserData] = useState({
        username: '',
        email: ''
    });

    return (
        <AuthContext.Provider value={{ userData, setUserData }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;