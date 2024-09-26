import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteLearningMunisiRequest, getLearningMunisiRequest } from "../../api/LearningMunisiRequest";
import { ConfirmDeleteModal } from "../../components";

const LearningMunisiContext = createContext();

export const LearningMunisiContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const [element, setElement] = useState(false);
    const [learning, setLearning] = useState({});
    const [categoryActive, setCategoryActive] = useState({});
    const [category, setCategory] = useState([
        {
            key: 'mlrs-astros-ii-mk-6',
            title: 'MLRS Astros II MK 6',
            isActive: true,
        },
        {
            key: 'meriam-155-mm-gs-caesar',
            title: 'Meriam 155 mm GS Caesar',
            isActive: false,
        },
        {
            key: 'meriam-155-mm-gs-m109a4',
            title: 'Meriam 155 mm GS M109A4',
            isActive: false,
        },
        {
            key: 'meriam-155-mm-tarik-kh-179',
            title: 'Meriam 155 mm Tarik KH 179',
            isActive: false,
        },
        {
            key: 'meriam-105-mm-tarik-kh-178',
            title: 'Meriam 105 mm Tarik KH 178',
            isActive: false,
        },
        {
            key: 'meriam-105-mm-tarik-m101a1',
            title: 'Meriam 105 mm Tarik M101A1',
            isActive: false,
        },
        {
            key: 'meriam-76-mm-tarik-m48',
            title: 'Meriam 76 mm Tarik M48',
            isActive: false,
        },
        {
            key: 'meriam-75-mm-tarik-salunting-gun',
            title: 'Meriam 75 mm Tarik Salunting Gun',
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
        await getLearningMunisiRequest({ filter: `category=${category}` }).then((res) => {
            setLearning(res);
        });
    };

    const onShowConfirmDelete = (learning_id) => {
        setElement(<ConfirmDeleteModal onClickOutside={() => setElement(false)} onCancel={() => setElement(false)} onSave={() => onDeleteLearning({ learning_id: learning_id })} />);
    };

    const onDeleteLearning = async ({ learning_id = null }) => {
        await deleteLearningMunisiRequest({ learning_id: learning_id }).then((res) => {
            setElement(false);
            onGetLearning({ category: res.category });
        });
    };

    useEffect(() => {
        onTabSwitch(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <LearningMunisiContext.Provider value={{ navigation, element, setElement, category, categoryActive, learning, setLearning, onShowConfirmDelete, onTabSwitch }}>
            {children}
        </LearningMunisiContext.Provider>
    );
}

export const UseLearningMunisiContext = () => {
    return useContext(LearningMunisiContext);
}