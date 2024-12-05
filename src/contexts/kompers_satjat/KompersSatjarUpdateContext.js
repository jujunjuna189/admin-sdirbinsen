import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getKompersSatjarRequest, updateKompersSatjarRequest } from "../../api/KompersSatjarRequest";
import { ErrorPopup, LoaderPopup, SuccessPopup } from "../../components";

const KompersSatjarUpdateContext = createContext();

export const KompersSatjarUpdateContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const params = useParams();
    const [element, setElement] = useState(false);
    const [errors, setErrors] = useState({});
    const [controller, setController] = useState({});

    const getKompersSatjarCategory = async () => {
        await getKompersSatjarRequest({ filter: `id=${params.id}` }).then((res) => {
            settingController(res.data[0]);
        });
    }

    const settingController = (item) => {
        setController({
            ...controller,
            kompers_satjar_categorys_id: item.kompers_satjar_categorys_id,
            title: item.title,
            category: item.category,
            sub_category: item.sub_category,
            part: { title: item.part, value: item.part },
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
        await updateKompersSatjarRequest({ id: params.id, body: dataBatch }).then((res) => {
            res?.errors && setErrors(res?.errors);
            res?.errors && setElement(<ErrorPopup />);
            !res?.errors && setElement(<SuccessPopup />);
            setTimeout(() => {
                setElement(false);
                setElement(false);
            }, 1000);
        });
    }

    useEffect(() => {
        getKompersSatjarCategory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <KompersSatjarUpdateContext.Provider value={{ navigation, element, errors, controller, onSetController, onSave }}>{children}</KompersSatjarUpdateContext.Provider>;
};

export const UseKompersSatjarUpdateContext = () => {
    return useContext(KompersSatjarUpdateContext);
};
