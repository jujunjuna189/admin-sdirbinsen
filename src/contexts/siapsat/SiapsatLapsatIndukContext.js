import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteSiapsatLapsatIndukRequest, getSiapsatLapsatIndukRequest } from "../../api/SiapsatLapsatIndukRequest";
import { ConfirmDeleteModal } from "../../components";

const SiapsatLapsatIndukContext = createContext();

export const SiapsatLapsatIndukContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const [element, setElement] = useState(false);
    const [data, setData] = useState([]);

    const onGetData = async () => {
        setData({});
        await getSiapsatLapsatIndukRequest().then((res) => {
            res === undefined && (res = {});
            res === null && (res = {});
            setData(res);
        });
    };

    const onShowConfirmDelete = (id) => {
        setElement(<ConfirmDeleteModal onClickOutside={() => setElement(false)} onCancel={() => setElement(false)} onSave={() => onDeleteSiapsat({ id: id })} />);
    };

    const onDeleteSiapsat = async ({ id = null }) => {
        await deleteSiapsatLapsatIndukRequest({ id: id }).then((res) => {
            setElement(false);
            onGetData();
        });
    };

    useEffect(() => {
        onGetData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <SiapsatLapsatIndukContext.Provider value={{ navigation, element, data, onShowConfirmDelete }}>{children}</SiapsatLapsatIndukContext.Provider>;
};

export const UseSiapsatLapsatIndukContext = () => {
    return useContext(SiapsatLapsatIndukContext);
};
