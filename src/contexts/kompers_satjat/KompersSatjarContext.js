import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const KompersSatjarContext = createContext();

export const KompersSatjarContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const [element] = useState(false);
    const [kompersSatjar, setKompersSatjar] = useState({});

    const getKompersSatjar = () => {
        var data = [{

        }];
        setKompersSatjar({ data: data });
    }

    useEffect(() => {
        getKompersSatjar();
    }, []);

    return <KompersSatjarContext.Provider value={{ navigation, element, kompersSatjar }}>{children}</KompersSatjarContext.Provider>;
};

export const UseKompersSatjarContext = () => {
    return useContext(KompersSatjarContext);
};
