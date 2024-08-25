import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getKompersSatjarCategoryRequest } from "../../api/KompersSatjarCategoryRequest";
import { createKompersSatjarRequest } from "../../api/KompersSatjarRequest";

const KompersSatjarCreateContext = createContext();

export const KompersSatjarCreateContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const params = useParams();
    const [element] = useState(false);
    const [controller, setController] = useState({});

    const getKompersSatjarCategory = async () => {
        await getKompersSatjarCategoryRequest({ filter: `id=${params.kompers_satjar_category_id}` }).then((res) => {
            settingController(res.data[0]);
        });
    }

    const settingController = (item) => {
        setController({
            ...controller,
            category: item.category,
            sub_category: item.sub_category,
            form: typeof item.form === 'string' ? JSON.parse(item.form) : item.form,
        });
    }

    const onSetController = (field, value) => {
        setController({ ...controller, [field]: value });
    };

    const onSave = async () => {
        await createKompersSatjarRequest({ body: { ...controller } }).then((res) => {
            console.log(res);
        });
    }

    useEffect(() => {
        getKompersSatjarCategory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <KompersSatjarCreateContext.Provider value={{ navigation, element, controller, onSetController, onSave }}>{children}</KompersSatjarCreateContext.Provider>;
};

export const UseKompersSatjarCreateContext = () => {
    return useContext(KompersSatjarCreateContext);
};
