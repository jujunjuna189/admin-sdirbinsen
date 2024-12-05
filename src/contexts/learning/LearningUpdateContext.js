import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getLearningRequest, updateLearningRequest } from "../../api/LearningRequest";
import { ErrorPopup, LoaderPopup, SuccessPopup } from "../../components";

const LearningUpdateContext = createContext();

export const LearningUpdateContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const param = useParams();
    const location = useLocation();
    const [element, setElement] = useState(false);
    const [controller, setController] = useState({
        category: location.state?.category,
    });
    const [errors, setErrors] = useState({});

    const onGetLearningDetail = async () => {
        await getLearningRequest({ filter: `id=${param.id}` }).then((res) => {
            res === undefined && (res = {});
            res === null && (res = {});
            settingController(res.data?.[0] ?? {});
        });
    }

    const settingController = (res) => {
        let dataBatch = {
            satuan_id: res.satuan_id,
            category: res.category,
            title: res.title,
            description: res.description,
            file: { name: res.file },
        };

        setController(dataBatch);
    }

    const onSetController = (field, value) => {
        setController({ ...controller, [field]: value });
    };

    const onSave = async () => {
        setElement(<LoaderPopup />);
        let dataBatch = { ...controller };
        dataBatch.file = dataBatch.file?.size != null ? dataBatch.file : null;
        await updateLearningRequest({ learning_id: param.id, body: dataBatch }).then((res) => {
            res?.errors && setErrors(res?.errors);
            res?.errors && setElement(<ErrorPopup />);
            !res?.errors && setElement(<SuccessPopup />);
            setTimeout(() => {
                setElement(false);
                !res?.errors && navigation(`/learning`, { state: { ...location.state } });
            }, 1000);
        });
    };

    useEffect(() => {
        onGetLearningDetail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <LearningUpdateContext.Provider value={{ navigation, location, element, controller, errors, setErrors, onSetController, onSave }}>
            {children}
        </LearningUpdateContext.Provider>
    );
}

export const UseLearningUpdateContext = () => {
    return useContext(LearningUpdateContext);
}