import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteSiapsatBinsatLaplakgiatRequest, getSiapsatBinsatLaplakgiatRequest } from "../../api/SiapsatBinsatLaplakgiatRequest";
import { ConfirmDeleteModal } from "../../components";

const SiapsatBinsatLaplakgiatContext = createContext();

export const SiapsatBinsatLaplakgiatContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const [element, setElement] = useState(false);
    const [data, setData] = useState([]);

    const onGetData = async () => {
        setData({});
        await getSiapsatBinsatLaplakgiatRequest().then((res) => {
            res === undefined && (res = {});
            res === null && (res = {});
            setData(res);
        });
    };

    const onShowConfirmDelete = (id) => {
        setElement(<ConfirmDeleteModal onClickOutside={() => setElement(false)} onCancel={() => setElement(false)} onSave={() => onDeleteSiapsat({ id: id })} />);
    };

    const onDeleteSiapsat = async ({ id = null }) => {
        await deleteSiapsatBinsatLaplakgiatRequest({ id: id }).then((res) => {
            setElement(false);
            onGetData();
        });
    };

    useEffect(() => {
        onGetData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <SiapsatBinsatLaplakgiatContext.Provider value={{ navigation, element, data, onShowConfirmDelete }}>{children}</SiapsatBinsatLaplakgiatContext.Provider>;
};

export const UseSiapsatBinsatLaplakgiatContext = () => {
    return useContext(SiapsatBinsatLaplakgiatContext);
};
