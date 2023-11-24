import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserPermissionRequest } from "../../api/UserPermissionRequest";
import { getUserDetailRequest } from "../../api/UserRequest";
import AddUserPersonilModal from "../../pages/profile/component/userPersonil";
import { getLocalUser } from "../../utils";

const ProfileContext = createContext();

export const ProfileContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const param = getLocalUser().auth;
    const [element, setElement] = useState(false);
    const [user, setUser] = useState({});
    const [permissions, setPermissions] = useState([]);

    const getUser = async ({ user_id = null }) => {
        await getUserDetailRequest({ id: user_id }).then((res) => {
            setUser(res);
        });
    }

    const getPermission = async () => {
        await getUserPermissionRequest({ user_id: param.id }).then((res) => {
            setPermissions(res);
        });
    }

    const onUserPersonil = async () => {
        setElement(<AddUserPersonilModal onClickOutside={() => setElement(false)} />);
    }

    useEffect(() => {
        getUser({ user_id: param.id });
        getPermission();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ProfileContext.Provider value={{ navigation, element, user, permissions, onUserPersonil }}>
            {children}
        </ProfileContext.Provider>
    );
}

export const UseProfileContext = () => {
    return useContext(ProfileContext);
}