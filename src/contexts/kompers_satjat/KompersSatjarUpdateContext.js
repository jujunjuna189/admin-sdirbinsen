import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getKompersSatjarRequest, updateKompersSatjarRequest } from "../../api/KompersSatjarRequest";
import { ErrorPopup, LoaderPopup, SuccessPopup } from "../../components";
import { getLocalUser } from "../../utils";

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
        let dataBatch = {
            kompers_satjar_categorys_id: item.kompers_satjar_categorys_id,
            title: item.title,
            satuan_id: { ...item.satuan },
            category: item.category,
            sub_category: item.sub_category,
            part: { title: item.part, key: item.part },
            form: typeof item.form === 'string' ? JSON.parse(item.form) : item.form,
        };

        setController(dataBatch);
    }

    const onSetController = (field, value) => {
        setController({ ...controller, [field]: value });
    };

    const onSave = async () => {
        setElement(<LoaderPopup />);
        let dataBatch = { ...controller };
        !getLocalUser()?.auth?.user?.satuan_id && (dataBatch.satuan_id = dataBatch.satuan_id?.id ?? null);
        getLocalUser()?.auth?.user?.satuan_id && (dataBatch.satuan_id = getLocalUser()?.auth?.user?.satuan_id ?? null);
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
