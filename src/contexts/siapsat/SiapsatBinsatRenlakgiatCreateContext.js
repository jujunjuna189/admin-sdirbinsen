import { createContext, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createSiapsatBinsatRenlakgiatRequest } from "../../api/SiapsatBinsatRenlakgiatRequest";
import { ErrorPopup, LoaderPopup, SuccessPopup } from "../../components";

const SiapsatBinsatRenlakgiatCreateContext = createContext();

export const SiapsatBinsatRenlakgiatCreateContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const param = useParams();
    const [element, setElement] = useState(false);
    const [controller, setController] = useState({
        kategori: param.kategori,
    });
    const [errors, setErrors] = useState({});

    const onSetController = (field, value) => {
        setController({ ...controller, [field]: value });
    };

    const onSave = async () => {
        setElement(<LoaderPopup />);
        let dataBatch = { ...controller };
        dataBatch.satuan_id = dataBatch.satuan_id?.id ?? null;
        await createSiapsatBinsatRenlakgiatRequest({ body: dataBatch }).then((res) => {
            res?.errors && setErrors(res?.errors);
            res?.errors && setElement(<ErrorPopup />);
            !res?.errors && setElement(<SuccessPopup />);
            setTimeout(() => {
                setElement(false);
                !res?.errors && navigation(`/siapsat/binsat_renlakgiat`);
            }, 1000);
        });
    };

    const onSaveAndAdd = async () => {
        setElement(<LoaderPopup />);
        let dataBatch = { ...controller };
        dataBatch.satuan_id = dataBatch.satuan_id?.id ?? null;
        await createSiapsatBinsatRenlakgiatRequest({ body: dataBatch }).then((res) => {
            res?.errors && setErrors(res?.errors);
            res?.errors && setElement(<ErrorPopup />);
            !res?.errors && setElement(<SuccessPopup />);
            setTimeout(() => {
                setElement(false);
            }, 1000);
        });
    };

    return <SiapsatBinsatRenlakgiatCreateContext.Provider value={{ navigation, param, element, controller, errors, onSetController, onSave, onSaveAndAdd }}>{children}</SiapsatBinsatRenlakgiatCreateContext.Provider>;
};

export const UseSiapsatBinsatRenlakgiatCreateContext = () => {
    return useContext(SiapsatBinsatRenlakgiatCreateContext);
};
