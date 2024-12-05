import { createContext, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createLearningRequest } from "../../api/LearningRequest";
import { ErrorPopup, LoaderPopup, SuccessPopup } from "../../components";

const LearningCreateContext = createContext();

export const LearningCreateContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const location = useLocation();
    const [element, setElement] = useState(false);
    const [controller, setController] = useState({
        category: location.state?.category,
    });
    const [errors, setErrors] = useState({});

    const onSetController = (field, value) => {
        setController({ ...controller, [field]: value });
    };

    const onSave = async () => {
        setElement(<LoaderPopup />);
        let dataBatch = { ...controller };
        await createLearningRequest({ body: dataBatch }).then((res) => {
            res?.errors && setErrors(res?.errors);
            res?.errors && setElement(<ErrorPopup />);
            !res?.errors && setElement(<SuccessPopup />);
            setTimeout(() => {
                setElement(false);
                !res?.errors && navigation(`/learning`, { state: { ...location.state } });
            }, 1000);
        });
    };

    const onSaveAndAdd = async () => {
        setElement(<LoaderPopup />);
        let dataBatch = { ...controller };
        await createLearningRequest({ body: dataBatch }).then((res) => {
            res?.errors && setErrors(res?.errors);
            res?.errors && setElement(<ErrorPopup />);
            !res?.errors && setElement(<SuccessPopup />);
            setTimeout(() => {
                setElement(false);
                !res?.errors && setController({ category: location.state?.category });
            }, 1000);
        });
    };

    return (
        <LearningCreateContext.Provider value={{ navigation, location, element, controller, errors, setErrors, onSetController, onSaveAndAdd, onSave }}>
            {children}
        </LearningCreateContext.Provider>
    );
}

export const UseLearningCreateContext = () => {
    return useContext(LearningCreateContext);
}