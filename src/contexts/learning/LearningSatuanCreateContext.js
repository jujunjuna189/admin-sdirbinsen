import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createLearningSatuanRequest } from "../../api/LearningSatuanRequest";
import { ErrorPopup, LoaderPopup, SuccessPopup } from "../../components";

const LearningSatuanCreateContext = createContext();

export const LearningSatuanCreateContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const [element, setElement] = useState(false);
    const [controller, setController] = useState({
        category: '-',
    });
    const [errors, setErrors] = useState({});

    const onSetController = (field, value) => {
        setController({ ...controller, [field]: value });
    };

    const onSave = async () => {
        setElement(<LoaderPopup />);
        let dataBatch = { ...controller };
        dataBatch.satuan_id = dataBatch.satuan_id?.id ?? null;
        await createLearningSatuanRequest({ body: dataBatch }).then((res) => {
            res?.errors && setErrors(res?.errors);
            res?.errors && setElement(<ErrorPopup />);
            !res?.errors && setElement(<SuccessPopup />);
            setTimeout(() => {
                setElement(false);
                !res?.errors && navigation(`/learning/satuan`);
            }, 1000);
        });
    };

    const onSaveAndAdd = async () => {
        setElement(<LoaderPopup />);
        let dataBatch = { ...controller };
        dataBatch.satuan_id = dataBatch.satuan_id?.id ?? null;
        await createLearningSatuanRequest({ body: dataBatch }).then((res) => {
            res?.errors && setErrors(res?.errors);
            res?.errors && setElement(<ErrorPopup />);
            !res?.errors && setElement(<SuccessPopup />);
            setTimeout(() => {
                setElement(false);
                !res?.errors && setController({ category: controller.category });
            }, 1000);
        });
    };

    return (
        <LearningSatuanCreateContext.Provider value={{ navigation, element, controller, errors, setErrors, onSetController, onSaveAndAdd, onSave }}>
            {children}
        </LearningSatuanCreateContext.Provider>
    );
}

export const UseLearningSatuanCreateContext = () => {
    return useContext(LearningSatuanCreateContext);
}