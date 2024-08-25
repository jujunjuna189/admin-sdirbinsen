import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getKompersSatjarRequest, updateKompersSatjarRequest } from "../../api/KompersSatjarRequest";

const KompersSatjarUpdateContext = createContext();

export const KompersSatjarUpdateContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const params = useParams();
    const [element] = useState(false);
    const [controller, setController] = useState({});

    const getKompersSatjarCategory = async () => {
        await getKompersSatjarRequest({ filter: `id=${params.id}` }).then((res) => {
            settingController(res.data[0]);
        });
    }

    const settingController = (item) => {
        setController({
            ...controller,
            title: item.title,
            category: item.category,
            sub_category: item.sub_category,
            form: typeof item.form === 'string' ? JSON.parse(item.form) : item.form,
        });
    }

    const onSetController = (field, value) => {
        setController({ ...controller, [field]: value });
    };

    const onSave = async () => {
        await updateKompersSatjarRequest({ id: params.id, body: { ...controller } }).then((res) => {
            console.log(res);
        });
    }

    useEffect(() => {
        getKompersSatjarCategory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <KompersSatjarUpdateContext.Provider value={{ navigation, element, controller, onSetController, onSave }}>{children}</KompersSatjarUpdateContext.Provider>;
};

export const UseKompersSatjarUpdateContext = () => {
    return useContext(KompersSatjarUpdateContext);
};
