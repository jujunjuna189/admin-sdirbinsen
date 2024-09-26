import { createContext, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createLearningMunisiRequest } from "../../api/LearningMunisiRequest";
import { ErrorPopup, LoaderPopup, SuccessPopup } from "../../components";

const LearningMunisiCreateContext = createContext();

export const LearningMunisiCreateContextProvider = ({ children }) => {
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
        await createLearningMunisiRequest({ body: dataBatch }).then((res) => {
            res?.errors && setErrors(res?.errors);
            res?.errors && setElement(<ErrorPopup />);
            !res?.errors && setElement(<SuccessPopup />);
            setTimeout(() => {
                setElement(false);
                !res?.errors && navigation(`/learning/munisi`);
            }, 1000);
        });
    };

    const onSaveAndAdd = async () => {
        setElement(<LoaderPopup />);
        let dataBatch = { ...controller };
        dataBatch.satuan_id = dataBatch.satuan_id?.id ?? null;
        await createLearningMunisiRequest({ body: dataBatch }).then((res) => {
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
        <LearningMunisiCreateContext.Provider value={{ navigation, element, controller, errors, setErrors, onSetController, onSaveAndAdd, onSave }}>
            {children}
        </LearningMunisiCreateContext.Provider>
    );
}

export const UseLearningMunisiCreateContext = () => {
    return useContext(LearningMunisiCreateContext);
}