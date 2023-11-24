import { createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { clearLocal, getLocalUser } from "../../utils";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const user = getLocalUser();

    const onLogout = async () => {
        clearLocal();
        navigation('/');
    }

    return (
        <AuthContext.Provider value={{ user, onLogout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const UseAuthContext = () => {
    return useContext(AuthContext);
}