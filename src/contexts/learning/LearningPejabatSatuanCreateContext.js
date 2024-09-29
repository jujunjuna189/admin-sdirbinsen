import { createContext, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createLearningPejabatSatuanRequest } from "../../api/LearningPejabatSatuanRequest";
import { ErrorPopup, LoaderPopup, SuccessPopup } from "../../components";

const LearningPejabatSatuanCreateContext = createContext();

export const LearningPejabatSatuanCreateContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const params = useParams();
    const [element, setElement] = useState(false);
    const [controller, setController] = useState({
        category: params.kategori,
    });
    const [errors, setErrors] = useState({});

    const onSetController = (field, value) => {
        setController({ ...controller, [field]: value });
    };

    const onSave = async () => {
        setElement(<LoaderPopup />);
        let dataBatch = { ...controller };
        dataBatch.satuan_id = dataBatch.satuan_id?.id ?? null;
        await createLearningPejabatSatuanRequest({ body: dataBatch }).then((res) => {
            res?.errors && setErrors(res?.errors);
            res?.errors && setElement(<ErrorPopup />);
            !res?.errors && setElement(<SuccessPopup />);
            setTimeout(() => {
                setElement(false);
                !res?.errors && navigation(`/learning/pejabat-satuan`);
            }, 1000);
        });
    };

    const onSaveAndAdd = async () => {
        setElement(<LoaderPopup />);
        let dataBatch = { ...controller };
        dataBatch.satuan_id = dataBatch.satuan_id?.id ?? null;
        await createLearningPejabatSatuanRequest({ body: dataBatch }).then((res) => {
            res?.errors && setErrors(res?.errors);
            res?.errors && setElement(<ErrorPopup />);
            !res?.errors && setElement(<SuccessPopup />);
            setTimeout(() => {
                setElement(false);
                !res?.errors && setController({ category: params.kategori });
            }, 1000);
        });
    };

    return (
        <LearningPejabatSatuanCreateContext.Provider value={{ navigation, element, controller, errors, setErrors, onSetController, onSaveAndAdd, onSave }}>
            {children}
        </LearningPejabatSatuanCreateContext.Provider>
    );
}

export const UseLearningPejabatSatuanCreateContext = () => {
    return useContext(LearningPejabatSatuanCreateContext);
}