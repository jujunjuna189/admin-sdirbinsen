import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteLearningRequest, getLearningRequest } from "../../api/LearningRequest";
import { ConfirmDeleteModal } from "../../components";

const LearningContext = createContext();

export const LearningContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const location = useLocation();
    const [filter, setFilter] = useState({});
    const [element, setElement] = useState(false);
    const [learning, setLearning] = useState({});

    const onFilter = (field, value) => {
        setFilter({ ...filter, [field]: value });
    }

    const onGetLearning = async () => {
        await getLearningRequest({ filter: `category=${location.state?.category ?? ''}&search=${filter.search ?? ''}` }).then((res) => {
            setLearning(res);
        });
    };

    const onShowConfirmDelete = (learning_id) => {
        setElement(<ConfirmDeleteModal onClickOutside={() => setElement(false)} onCancel={() => setElement(false)} onSave={() => onDeleteLearning({ learning_id: learning_id })} />);
    };

    const onDeleteLearning = async ({ learning_id = null }) => {
        await deleteLearningRequest({ learning_id: learning_id }).then((res) => {
            setElement(false);
            onGetLearning({ category: res.category });
        });
    };

    useEffect(() => {
        onGetLearning();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location, filter]);

    return (
        <LearningContext.Provider value={{ navigation, location, element, filter, setElement, learning, setLearning, onShowConfirmDelete, onFilter }}>
            {children}
        </LearningContext.Provider>
    );
}

export const UseLearningContext = () => {
    return useContext(LearningContext);
}