import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSiapsatIndukRequest } from "../../api/SiapsatIndukRequest";

const SiapsatEkkoIndukContext = createContext();

export const SiapsatEkkoIndukContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const [element] = useState(false);
    const [data, setData] = useState([]);

    const onGetData = async () => {
        setData({});
        await getSiapsatIndukRequest().then((res) => {
            res === undefined && (res = {});
            res === null && (res = {});
            setData(res);
        });
    };

    useEffect(() => {
        onGetData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <SiapsatEkkoIndukContext.Provider value={{ navigation, element, data }}>{children}</SiapsatEkkoIndukContext.Provider>;
};

export const UseSiapsatEkkoIndukContext = () => {
    return useContext(SiapsatEkkoIndukContext);
};
