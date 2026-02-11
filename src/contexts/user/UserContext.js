import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteUserRequest, getUserRequest } from "../../api/UserRequest";
import { ConfirmDeleteModal } from "../../components";
import { getPageState, setPageState } from "../../utils";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const savedState = getPageState('user');
    const [element, setElement] = useState(false);
    const [filter, setFilter] = useState(savedState?.filter ?? {});
    const [user, setUser] = useState({});

    const onFilter = (field, value) => {
        setFilter({ ...filter, [field]: value });
    }

    const onGetUser = async ({ page = 1 }) => {
        setUser({});
        await getUserRequest({ filter: `?role_id=${filter.role_id ?? ''}` }).then((res) => {
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
            onGetUser({});
        });
    }

    useEffect(() => {
        onGetUser({});
        setPageState('user', { filter });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter]);

    return (
        <UserContext.Provider value={{ navigation, element, user, onShowConfirmDelete, onFilter }}>
            {children}
        </UserContext.Provider>
    );
}

export const UseUserContext = () => {
    return useContext(UserContext);
}