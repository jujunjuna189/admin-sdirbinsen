import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteLearningResponsibilityRequest, getLearningResponsibilityRequest } from "../../api/LearningResponsibilityRequest";
import { ConfirmDeleteModal } from "../../components";

const LearningResponsibilityContext = createContext();

export const LearningResponsibilityContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const location = useLocation();
    const [element, setElement] = useState(false);
    const [learning, setLearning] = useState({});
    const [categoryActive, setCategoryActive] = useState({});
    const [category, setCategory] = useState([]);

    const onTabSwitch = (indexItem) => {
        category.forEach((item, index) => {
            category[index].isActive = false;
        });

        category[indexItem].isActive = true;
        setCategory([...category]);
        setCategoryActive({ ...category[indexItem] });
        onGetLearning({ category: location?.state?.category ?? '', type: category?.[indexItem]?.key ?? '' });
    };

    const onGetCategory = () => {
        var subCategory = []
        switch (location?.state?.category) {
            case "yonarmed-rocket":
                subCategory = [
                    {
                        key: 'MLRS Astros II MK 6',
                        title: 'MLRS Astros II MK 6',
                        isActive: true,
                    },
                    {
                        key: 'Peluru Kendali',
                        title: 'Peluru Kendali',
                        isActive: false,
                    },
                ];
                break;
            case "yonarmed-sedang":
                subCategory = [
                    {
                        key: 'Meriam 155 mm GS Caesar',
                        title: 'Meriam 155 mm GS Caesar',
                        isActive: true,
                    },
                    {
                        key: 'Meriam 155 mm GS M109A4BE',
                        title: 'Meriam 155 mm GS M109A4BE',
                        isActive: false,
                    },
                    {
                        key: 'Meriam 155 mm Tarik KH 179',
                        title: 'Meriam 155 mm Tarik KH 179',
                        isActive: false,
                    },
                ];
                break;
            case "yonarmed-ringan":
                subCategory = [
                    {
                        key: 'Meriam 105 mm Tarik KH 178',
                        title: 'Meriam 105 mm Tarik KH 178',
                        isActive: true,
                    },
                    {
                        key: 'Meriam 105 mm Tarik M101A1',
                        title: 'Meriam 105 mm Tarik M101A1',
                        isActive: false,
                    },
                    {
                        key: 'Meriam 76 mm Tarik M48',
                        title: 'Meriam 76 mm Tarik M48',
                        isActive: false,
                    },
                    {
                        key: 'Meriam 75 mm Tarik Saluting Gun',
                        title: 'Meriam 75 mm Tarik Saluting Gun',
                        isActive: false,
                    },
                ];
                break;
            default:
                subCategory = [];
                break;
        }

        setCategory(subCategory);
        setCategoryActive({ ...subCategory[0] });
        onGetLearning({ category: location?.state?.category ?? '', type: subCategory[0].key });
    }

    const onGetLearning = async ({ category, type }) => {
        await getLearningResponsibilityRequest({ filter: `category=${category}&type=${type}` }).then((res) => {
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
        onGetCategory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location?.state?.category]);

    return (
        <LearningResponsibilityContext.Provider value={{ navigation, location, element, setElement, category, categoryActive, learning, setLearning, onShowConfirmDelete, onTabSwitch }}>
            {children}
        </LearningResponsibilityContext.Provider>
    );
}

export const UseLearningResponsibilityContext = () => {
    return useContext(LearningResponsibilityContext);
}