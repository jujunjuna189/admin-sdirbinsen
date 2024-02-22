import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSatuanDetailRequest } from "../../api/SatuanRequest";
import { getUserPermissionRequest } from "../../api/UserPermissionRequest";
import { getUserDetailRequest } from "../../api/UserRequest";

const UserDetailContext = createContext();

export const UserDetailContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const param = useParams();
    const [user, setUser] = useState({});
    const [permissions, setPermissions] = useState([]);
    const [satuan, setSatuan] = useState({});

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

    const getSatuan = async () => {
        await getSatuanDetailRequest({ id: param.id }).then((res) => {
            setSatuan(res);
        });
    }

    useEffect(() => {
        getUser({ user_id: param.id });
        getPermission();
        getSatuan();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <UserDetailContext.Provider value={{ navigation, user, permissions, satuan, getPermission }}>
            {children}
        </UserDetailContext.Provider>
    );
}

export const UseUserDetailContext = () => {
    return useContext(UserDetailContext);
}