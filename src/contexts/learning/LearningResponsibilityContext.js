import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteLearningResponsibilityRequest, getLearningResponsibilityRequest } from "../../api/LearningResponsibilityRequest";
import { ConfirmDeleteModal } from "../../components";

const LearningResponsibilityContext = createContext();

export const LearningResponsibilityContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const [element, setElement] = useState(false);
    const [learning, setLearning] = useState({});

    const onGetLearning = async () => {
        await getLearningResponsibilityRequest({}).then((res) => {
            setLearning(res);
        });
    };

    const onShowConfirmDelete = (learning_id) => {
        setElement(<ConfirmDeleteModal onClickOutside={() => setElement(false)} onCancel={() => setElement(false)} onSave={() => onDeleteLearning({ learning_id: learning_id })} />);
    };

    const onDeleteLearning = async ({ learning_id = null }) => {
        await deleteLearningResponsibilityRequest({ learning_id: learning_id }).then((res) => {
            setElement(false);
            onGetLearning();
        });
    };

    useEffect(() => {
        onGetLearning();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <LearningResponsibilityContext.Provider value={{ navigation, element, setElement, learning, setLearning, onShowConfirmDelete }}>
            {children}
        </LearningResponsibilityContext.Provider>
    );
}

export const UseLearningResponsibilityContext = () => {
    return useContext(LearningResponsibilityContext);
}