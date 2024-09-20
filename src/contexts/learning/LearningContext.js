import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteLearningRequest, getLearningRequest } from "../../api/LearningRequest";
import { ConfirmDeleteModal } from "../../components";

const LearningContext = createContext();

export const LearningContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const params = useParams();
    const [element, setElement] = useState(false);
    const [learning, setLearning] = useState({});

    const onGetLearning = async () => {
        await getLearningRequest({ filter: `category=${params.kategori}` }).then((res) => {
            setLearning(res);
        });
    };

    const onShowConfirmDelete = (learning_id) => {
        setElement(<ConfirmDeleteModal onClickOutside={() => setElement(false)} onCancel={() => setElement(false)} onSave={() => onDeleteLearning({ learning_id: learning_id })} />);
    };

    const onDeleteLearning = async ({ learning_id = null }) => {
        await deleteLearningRequest({ learning_id: learning_id }).then((res) => {
            setElement(false);
            onGetLearning();
        });
    };

    useEffect(() => {
        onGetLearning();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.kategori]);

    return (
        <LearningContext.Provider value={{ navigation, params, element, setElement, learning, setLearning, onShowConfirmDelete }}>
            {children}
        </LearningContext.Provider>
    );
}

export const UseLearningContext = () => {
    return useContext(LearningContext);
}