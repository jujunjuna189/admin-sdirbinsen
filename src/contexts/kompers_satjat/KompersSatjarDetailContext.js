import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getKompersSatjarRequest } from "../../api/KompersSatjarRequest";

const KompersSatjarDetailContext = createContext();

export const KompersSatjarDetailContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const params = useParams();
    const [element] = useState(false);
    const [kompersSatjar, setKompersSatjar] = useState({});

    const getKompersSatjarCategory = async () => {
        await getKompersSatjarRequest({ filter: `id=${params.id}` }).then((res) => {
            settingController(res.data[0]);
        });
    }

    const settingController = (item) => {
        setKompersSatjar({
            ...kompersSatjar,
            title: item.title,
            category: item.category,
            sub_category: item.sub_category,
            form: typeof item.form === 'string' ? JSON.parse(item.form) : item.form,
        });
    }

    useEffect(() => {
        getKompersSatjarCategory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <KompersSatjarDetailContext.Provider value={{ navigation, element, kompersSatjar }}>{children}</KompersSatjarDetailContext.Provider>;
};

export const UseKompersSatjarDetailContext = () => {
    return useContext(KompersSatjarDetailContext);
};
