import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteUserRequest, getUserRequest } from "../../api/UserRequest";
import { ConfirmDeleteModal } from "../../components";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const [element, setElement] = useState(false);
    const [user, setUser] = useState({});

    const onGetUser = async () => {
        setUser({});
        await getUserRequest().then((res) => {
            res === undefined && (res = {});
            res === null && (res = {});
            setUser(res);
        });
    }

    const onShowConfirmDelete = (user_id) => {
        setElement(<ConfirmDeleteModal onClickOutside={() => setElement(false)} onCancel={() => setElement(false)} onSave={() => onDeleteUser({ user_id: user_id })} />);
    }

    const onDeleteUser = async ({ user_id = null }) => {
        await deleteUserRequest({ user_id: user_id }).then((res) => {
            setElement(false);
            onGetUser();
        });
    }

    useEffect(() => {
        onGetUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <UserContext.Provider value={{ navigation, element, user, onShowConfirmDelete }}>
            {children}
        </UserContext.Provider>
    );
}

export const UseUserContext = () => {
    return useContext(UserContext);
}