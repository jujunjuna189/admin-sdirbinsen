import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteLearningAlutsistaRequest, getLearningAlutsistaRequest } from "../../api/LearningAlutsistaRequest";
import { ConfirmDeleteModal } from "../../components";

const LearningAlutsistaContext = createContext();

export const LearningAlutsistaContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const [element, setElement] = useState(false);
    const [learning, setLearning] = useState({});
    const [categoryActive, setCategoryActive] = useState({});
    const [category, setCategory] = useState([
        {
            key: 'yonarmed-rocket',
            title: 'Yonarmed Roket',
            isActive: true,
        },
        {
            key: 'yonarmed-sedang',
            title: 'Yonarmed Sedang',
            isActive: false,
        },
        {
            key: 'yonarmed-ringan',
            title: 'Yonarmed Ringan',
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
        await getLearningAlutsistaRequest({ filter: `category=${category}` }).then((res) => {
            setLearning(res);
        });
    };

    const onShowConfirmDelete = (learning_id) => {
        setElement(<ConfirmDeleteModal onClickOutside={() => setElement(false)} onCancel={() => setElement(false)} onSave={() => onDeleteLearning({ learning_id: learning_id })} />);
    };

    const onDeleteLearning = async ({ learning_id = null }) => {
        await deleteLearningAlutsistaRequest({ learning_id: learning_id }).then((res) => {
            setElement(false);
            onGetLearning({ category: res.category });
        });
    };

    useEffect(() => {
        onTabSwitch(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <LearningAlutsistaContext.Provider value={{ navigation, element, setElement, category, categoryActive, learning, setLearning, onShowConfirmDelete, onTabSwitch }}>
            {children}
        </LearningAlutsistaContext.Provider>
    );
}

export const UseLearningAlutsistaContext = () => {
    return useContext(LearningAlutsistaContext);
}