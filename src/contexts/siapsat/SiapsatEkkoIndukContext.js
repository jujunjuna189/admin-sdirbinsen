import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteSiapsatIndukRequest, getSiapsatIndukRequest } from "../../api/SiapsatIndukRequest";
import { ConfirmDeleteModal } from "../../components";

const SiapsatEkkoIndukContext = createContext();

export const SiapsatEkkoIndukContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const [element, setElement] = useState(false);
    const [data, setData] = useState([]);

    const onGetData = async () => {
        setData({});
        await getSiapsatIndukRequest().then((res) => {
            res === undefined && (res = {});
            res === null && (res = {});
            setData(res);
        });
    };

    const onShowConfirmDelete = (id) => {
        setElement(<ConfirmDeleteModal onClickOutside={() => setElement(false)} onCancel={() => setElement(false)} onSave={() => onDeleteSiapsat({ id: id })} />);
    };

    const onDeleteSiapsat = async ({ id = null }) => {
        await deleteSiapsatIndukRequest({ id: id }).then((res) => {
            setElement(false);
            onGetData();
        });
    };

    useEffect(() => {
        onGetData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <SiapsatEkkoIndukContext.Provider value={{ navigation, element, data, onShowConfirmDelete }}>{children}</SiapsatEkkoIndukContext.Provider>;
};

export const UseSiapsatEkkoIndukContext = () => {
    return useContext(SiapsatEkkoIndukContext);
};
