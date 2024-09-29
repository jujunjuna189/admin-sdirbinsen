import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteLearningPejabatSatuanRequest, getLearningPejabatSatuanRequest } from "../../api/LearningPejabatSatuanRequest";
import { ConfirmDeleteModal } from "../../components";

const LearningPejabatSatuanContext = createContext();

export const LearningPejabatSatuanContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const [element, setElement] = useState(false);
    const [learning, setLearning] = useState({});
    const [categoryActive, setCategoryActive] = useState({});
    const [category, setCategory] = useState([
        {
            key: 'pusenarmed',
            title: 'Pusenarmed',
            isActive: true,
        },
        {
            key: 'pusdikarmed',
            title: 'Pusdikarmed',
            isActive: false,
        },
        {
            key: 'dansat-armed',
            title: 'Dansat Armed',
            isActive: false,
        },
    ]);

    const onTabSwitch = (indexItem) => {
        category.forEach((item, index) => {
            category[index].isActive = false;
        });

        category[indexItem].isActive = true;
        setCategory([...category]);
        setCategoryActive({ ...category[indexItem] });
        onGetLearning({ category: category[indexItem].key });
    };

    const onGetLearning = async ({ category }) => {
        await getLearningPejabatSatuanRequest({ filter: `category=${category}` }).then((res) => {
            setLearning(res);
        });
    };

    const onShowConfirmDelete = (learning_id) => {
        setElement(<ConfirmDeleteModal onClickOutside={() => setElement(false)} onCancel={() => setElement(false)} onSave={() => onDeleteLearning({ learning_id: learning_id })} />);
    };

    const onDeleteLearning = async ({ learning_id = null }) => {
        await deleteLearningPejabatSatuanRequest({ learning_id: learning_id }).then((res) => {
            setElement(false);
            onGetLearning({ category: res.category });
        });
    };

    useEffect(() => {
        onTabSwitch(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <LearningPejabatSatuanContext.Provider value={{ navigation, element, setElement, category, categoryActive, learning, setLearning, onShowConfirmDelete, onTabSwitch }}>
            {children}
        </LearningPejabatSatuanContext.Provider>
    );
}

export const UseLearningPejabatSatuanContext = () => {
    return useContext(LearningPejabatSatuanContext);
}