import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createKompersSatjarCategoryRequest } from "../../api/KompersSatjarCategoryRequest";

const KompersSatjarCategoryCreateContext = createContext();

export const KompersSatjarCategoryCreateContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const [element] = useState(false);
    const [controller, setController] = useState({});

    const onSetController = (field, value) => {
        setController({ ...controller, [field]: value });
    };

    const onSave = async () => {
        await createKompersSatjarCategoryRequest({ body: { ...controller } }).then((res) => {
            console.log(res);
        });
    }

    return <KompersSatjarCategoryCreateContext.Provider value={{ navigation, element, controller, onSetController, onSave }}>{children}</KompersSatjarCategoryCreateContext.Provider>;
};

export const UseKompersSatjarCategoryCreateContext = () => {
    return useContext(KompersSatjarCategoryCreateContext);
};
