import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteSiapsatBinsatRenlakgiatRequest, getSiapsatBinsatRenlakgiatRequest } from "../../api/SiapsatBinsatRenlakgiatRequest";
import { ConfirmDeleteModal } from "../../components";

const SiapsatBinsatRenlakgiatContext = createContext();

export const SiapsatBinsatRenlakgiatContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const [element, setElement] = useState(false);
    const [data, setData] = useState([]);

    const onGetData = async () => {
        setData({});
        await getSiapsatBinsatRenlakgiatRequest().then((res) => {
            res === undefined && (res = {});
            res === null && (res = {});
            setData(res);
        });
    };

    const onShowConfirmDelete = (id) => {
        setElement(<ConfirmDeleteModal onClickOutside={() => setElement(false)} onCancel={() => setElement(false)} onSave={() => onDeleteSiapsat({ id: id })} />);
    };

    const onDeleteSiapsat = async ({ id = null }) => {
        await deleteSiapsatBinsatRenlakgiatRequest({ id: id }).then((res) => {
            setElement(false);
            onGetData();
        });
    };

    useEffect(() => {
        onGetData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <SiapsatBinsatRenlakgiatContext.Provider value={{ navigation, element, data, onShowConfirmDelete }}>{children}</SiapsatBinsatRenlakgiatContext.Provider>;
};

export const UseSiapsatBinsatRenlakgiatContext = () => {
    return useContext(SiapsatBinsatRenlakgiatContext);
};
