import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteLearningSatuanRequest, getLearningSatuanRequest } from "../../api/LearningSatuanRequest";
import { ConfirmDeleteModal } from "../../components";

const LearningSatuanContext = createContext();

export const LearningSatuanContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const [element, setElement] = useState(false);
    const [learning, setLearning] = useState({});

    const onGetLearning = async () => {
        await getLearningSatuanRequest({}).then((res) => {
            setLearning(res);
        });
    };

    const onShowConfirmDelete = (learning_id) => {
        setElement(<ConfirmDeleteModal onClickOutside={() => setElement(false)} onCancel={() => setElement(false)} onSave={() => onDeleteLearning({ learning_id: learning_id })} />);
    };

    const onDeleteLearning = async ({ learning_id = null }) => {
        await deleteLearningSatuanRequest({ learning_id: learning_id }).then((res) => {
            setElement(false);
            onGetLearning({ category: res.category });
        });
    };

    useEffect(() => {
        onGetLearning();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <LearningSatuanContext.Provider value={{ navigation, element, setElement, learning, setLearning, onShowConfirmDelete }}>
            {children}
        </LearningSatuanContext.Provider>
    );
}

export const UseLearningSatuanContext = () => {
    return useContext(LearningSatuanContext);
}