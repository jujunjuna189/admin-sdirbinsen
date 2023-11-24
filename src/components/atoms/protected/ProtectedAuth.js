import { Navigate } from "react-router-dom";
import { UseAuthContext } from "../../../contexts/auth/AuthContext";

const ProtectedAuth = ({ children }) => {
    const { user } = UseAuthContext();
    if (!user) {
        return <Navigate to={'/'} />
    }

    return children;
}

export default ProtectedAuth;