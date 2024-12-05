import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getKompersSatjarCategoryRequest } from "../../api/KompersSatjarCategoryRequest";
import { createKompersSatjarRequest } from "../../api/KompersSatjarRequest";
import { ErrorPopup, LoaderPopup, SuccessPopup } from "../../components";

const KompersSatjarCreateContext = createContext();

export const KompersSatjarCreateContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const params = useParams();
    const [element, setElement] = useState(false);
    const [errors, setErrors] = useState({});
    const [controller, setController] = useState({});

    const getKompersSatjarCategory = async () => {
        await getKompersSatjarCategoryRequest({ filter: `id=${params.kompers_satjar_category_id}` }).then((res) => {
            settingController(res.data[0]);
        });
    }

    const settingController = (item) => {
        setController({
            ...controller,
            kompers_satjar_categorys_id: item.id,
            category: item.category,
            sub_category: item.sub_category,
            form: typeof item.form === 'string' ? JSON.parse(item.form) : item.form,
        });
    }

    const onSetController = (field, value) => {
        setController({ ...controller, [field]: value });
    };

    const onSave = async () => {
        setElement(<LoaderPopup />);
        let dataBatch = { ...controller };
        dataBatch.part = dataBatch.part?.key;
        await createKompersSatjarRequest({ body: dataBatch }).then((res) => {
            res?.errors && setErrors(res?.errors);
            res?.errors && setElement(<ErrorPopup />);
            !res?.errors && setElement(<SuccessPopup />);
            setTimeout(() => {
                setElement(false);
                !res?.errors && navigation(`/personil/kompers_satjar`);
            }, 1000);
        });
    }

    useEffect(() => {
        getKompersSatjarCategory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <KompersSatjarCreateContext.Provider value={{ navigation, element, controller, errors, onSetController, onSave }}>{children}</KompersSatjarCreateContext.Provider>;
};

export const UseKompersSatjarCreateContext = () => {
    return useContext(KompersSatjarCreateContext);
};
