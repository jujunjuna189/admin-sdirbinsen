import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createKompersSatjarCategoryRequest } from "../../api/KompersSatjarCategoryRequest";
import { ErrorPopup, LoaderPopup, SuccessPopup } from "../../components";

const KompersSatjarCategoryCreateContext = createContext();

export const KompersSatjarCategoryCreateContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const [element, setElement] = useState(false);
    const [errors, setErrors] = useState({});
    const [controller, setController] = useState({});

    const onSetController = (field, value) => {
        setController({ ...controller, [field]: value });
    };

    const onSave = async () => {
        setElement(<LoaderPopup />);
        await createKompersSatjarCategoryRequest({ body: { ...controller } }).then((res) => {
            res?.errors && setErrors(res?.errors);
            res?.errors && setElement(<ErrorPopup />);
            !res?.errors && setElement(<SuccessPopup />);
            setTimeout(() => {
                setElement(false);
                !res?.errors && navigation(`/personil/kompers_satjar`);
            }, 1000);
        });
    }

    return <KompersSatjarCategoryCreateContext.Provider value={{ navigation, element, controller, errors, onSetController, onSave }}>{children}</KompersSatjarCategoryCreateContext.Provider>;
};

export const UseKompersSatjarCategoryCreateContext = () => {
    return useContext(KompersSatjarCategoryCreateContext);
};
