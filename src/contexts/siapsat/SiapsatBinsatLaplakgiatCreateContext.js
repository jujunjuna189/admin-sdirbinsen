import { createContext, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createSiapsatBinsatLaplakgiatRequest } from "../../api/SiapsatBinsatLaplakgiatRequest";
import { ErrorPopup, LoaderPopup, SuccessPopup } from "../../components";

const SiapsatBinsatLaplakgiatCreateContext = createContext();

export const SiapsatBinsatLaplakgiatCreateContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const param = useParams();
    const [element, setElement] = useState(false);
    const [controller, setController] = useState({});
    const [errors, setErrors] = useState({});

    const onSetController = (field, value) => {
        setController({ ...controller, [field]: value });
    };

    const onSave = async () => {
        setElement(<LoaderPopup />);
        let dataBatch = { ...controller };
        dataBatch.satuan_id = dataBatch.satuan_id?.id ?? null;
        await createSiapsatBinsatLaplakgiatRequest({ body: dataBatch }).then((res) => {
            res?.errors && setErrors(res?.errors);
            res?.errors && setElement(<ErrorPopup />);
            !res?.errors && setElement(<SuccessPopup />);
            setTimeout(() => {
                setElement(false);
                !res?.errors && navigation(`/siapsat/binsat_laplakgiat`);
            }, 1000);
        });
    };

    const onSaveAndAdd = async () => {
        setElement(<LoaderPopup />);
        let dataBatch = { ...controller };
        dataBatch.satuan_id = dataBatch.satuan_id?.id ?? null;
        await createSiapsatBinsatLaplakgiatRequest({ body: dataBatch }).then((res) => {
            res?.errors && setErrors(res?.errors);
            res?.errors && setElement(<ErrorPopup />);
            !res?.errors && setElement(<SuccessPopup />);
            setTimeout(() => {
                setElement(false);
            }, 1000);
        });
    };

    return <SiapsatBinsatLaplakgiatCreateContext.Provider value={{ navigation, param, element, controller, errors, onSetController, onSave, onSaveAndAdd }}>{children}</SiapsatBinsatLaplakgiatCreateContext.Provider>;
};

export const UseSiapsatBinsatLaplakgiatCreateContext = () => {
    return useContext(SiapsatBinsatLaplakgiatCreateContext);
};
