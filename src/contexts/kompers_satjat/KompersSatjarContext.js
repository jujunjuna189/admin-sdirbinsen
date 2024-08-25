import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getKompersSatjarCategoryRequest } from "../../api/KompersSatjarCategoryRequest";
import { getKompersSatjarRequest } from "../../api/KompersSatjarRequest";

const KompersSatjarContext = createContext();

export const KompersSatjarContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const [element] = useState(false);
    const [kompersSatjarCategory, setKompersSatjarCategory] = useState([]);
    const [kompersSatjarCategoryActive, setKompersSatjarCategoryActive] = useState([]);
    const [kompersSatjar, setKompersSatjar] = useState({});

    const getKompersSatjarCategory = async () => {
        await getKompersSatjarCategoryRequest({}).then((res) => {
            settingKompersSatjarCategory(res.data);
        });
    }

    const settingKompersSatjarCategory = (res) => {
        var datas = [];
        res.forEach((item, index) => {
            datas.push({
                id: item.id,
                kompers_satjar_categorys_id: item.kompers_satjar_categorys_id,
                category: item.category,
                sub_category: item.sub_category,
                isActive: index === 0 ? true : false,
            });
        });
        setKompersSatjarCategory([...datas]);
        setKompersSatjarCategoryActive({ ...datas[0] });
        getKompersSatjar({ kompers_satjar_categorys_id: datas?.[0]?.kompers_satjar_categorys_id });
    };

    const getKompersSatjar = async ({ category = '', sub_category = '' }) => {
        await getKompersSatjarRequest({ filter: `category=${category}&sub_category=${sub_category}` }).then((res) => {
            setKompersSatjar(res);
        });
    }

    const onTabSwitch = (indexItem) => {
        kompersSatjarCategory.forEach((item, index) => {
            kompersSatjarCategory[index].isActive = false;
        });

        kompersSatjarCategory[indexItem].isActive = true;
        setKompersSatjarCategory([...kompersSatjarCategory]);
        setKompersSatjarCategoryActive({ ...kompersSatjarCategory[indexItem] });
        getKompersSatjar({ kompers_satjar_categorys_id: kompersSatjarCategory[indexItem].kompers_satjar_categorys_id });
    };

    useEffect(() => {
        getKompersSatjarCategory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <KompersSatjarContext.Provider value={{ navigation, element, kompersSatjar, kompersSatjarCategory, kompersSatjarCategoryActive, onTabSwitch }}>{children}</KompersSatjarContext.Provider>;
};

export const UseKompersSatjarContext = () => {
    return useContext(KompersSatjarContext);
};
