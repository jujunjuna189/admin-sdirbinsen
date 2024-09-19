import { createContext, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createLearnigRequest } from "../../api/LearningRequest";
import { ErrorPopup, LoaderPopup, SuccessPopup } from "../../components";

const LearningCreateContext = createContext();

export const LearningCreateContextProvider = ({ children }) => {
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
        await createLearnigRequest({ body: dataBatch }).then((res) => {
            res?.errors && setErrors(res?.errors);
            res?.errors && setElement(<ErrorPopup />);
            !res?.errors && setElement(<SuccessPopup />);
            setTimeout(() => {
                setElement(false);
                !res?.errors && navigation(`/learning/${params.kategori}`);
            }, 1000);
        });
    };

    const onSaveAndAdd = async () => {
        setElement(<LoaderPopup />);
        let dataBatch = { ...controller };
        dataBatch.satuan_id = dataBatch.satuan_id?.id ?? null;
        await createLearnigRequest({ body: dataBatch }).then((res) => {
            res?.errors && setErrors(res?.errors);
            res?.errors && setElement(<ErrorPopup />);
            !res?.errors && setElement(<SuccessPopup />);
            setTimeout(() => {
                setElement(false);
                !res?.errors && setController({ kategori: controller.kategori });
            }, 1000);
        });
    };

    return (
        <LearningCreateContext.Provider value={{ navigation, element, controller, errors, setErrors, onSetController, onSaveAndAdd, onSave }}>
            {children}
        </LearningCreateContext.Provider>
    );
}

export const UseLearningCreateContext = () => {
    return useContext(LearningCreateContext);
}