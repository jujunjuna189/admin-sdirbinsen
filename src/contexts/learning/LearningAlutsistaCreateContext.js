import { createContext, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createLearnigAlutsistaRequest } from "../../api/LearningAlutsistaRequest";
import { ErrorPopup, LoaderPopup, SuccessPopup } from "../../components";

const LearningAlutsistaCreateContext = createContext();

export const LearningAlutsistaCreateContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const location = useLocation();
    const [element, setElement] = useState(false);
    const [controller, setController] = useState({
        category: location.state?.category,
        type: location.state?.type,
    });
    const [errors, setErrors] = useState({});

    const onSetController = (field, value) => {
        setController({ ...controller, [field]: value });
    };

    const onSave = async () => {
        setElement(<LoaderPopup />);
        let dataBatch = { ...controller };
        dataBatch.satuan_id = dataBatch.satuan_id?.id ?? null;
        await createLearnigAlutsistaRequest({ body: dataBatch }).then((res) => {
            res?.errors && setErrors(res?.errors);
            res?.errors && setElement(<ErrorPopup />);
            !res?.errors && setElement(<SuccessPopup />);
            setTimeout(() => {
                setElement(false);
                !res?.errors && navigation(`/learning/alutsista`, { state: { category: location.state?.category } });
            }, 1000);
        });
    };

    const onSaveAndAdd = async () => {
        setElement(<LoaderPopup />);
        let dataBatch = { ...controller };
        dataBatch.satuan_id = dataBatch.satuan_id?.id ?? null;
        await createLearnigAlutsistaRequest({ body: dataBatch }).then((res) => {
            res?.errors && setErrors(res?.errors);
            res?.errors && setElement(<ErrorPopup />);
            !res?.errors && setElement(<SuccessPopup />);
            setTimeout(() => {
                setElement(false);
                !res?.errors && setController({ category: location.state?.category, type: location.state?.type });
            }, 1000);
        });
    };

    return (
        <LearningAlutsistaCreateContext.Provider value={{ navigation, element, controller, errors, setErrors, onSetController, onSaveAndAdd, onSave }}>
            {children}
        </LearningAlutsistaCreateContext.Provider>
    );
}

export const UseLearningAlutsistaCreateContext = () => {
    return useContext(LearningAlutsistaCreateContext);
}