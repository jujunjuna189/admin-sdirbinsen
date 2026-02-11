import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getKompersSatjarCategoryRequest } from "../../api/KompersSatjarCategoryRequest";
import { deleteKompersSatjarRequest, getKompersSatjarRequest } from "../../api/KompersSatjarRequest";
import { ConfirmDeleteModal } from "../../components";
import { getPageState, setPageState } from "../../utils";

const KompersSatjarContext = createContext();

export const KompersSatjarContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const savedState = getPageState('kompers_satjar');
    const [element, setElement] = useState(false);
    const [filter, setFilter] = useState(savedState?.filter ?? {});
    const [kompersSatjarCategory, setKompersSatjarCategory] = useState([]);
    const [kompersSatjarCategoryActive, setKompersSatjarCategoryActive] = useState(savedState?.kompersSatjarCategoryActive ?? []);
    const [kompersSatjar, setKompersSatjar] = useState({});

    const onFilter = (field, value) => {
        setFilter({ ...filter, [field]: value });
    }

    const getKompersSatjarCategory = async () => {
        await getKompersSatjarCategoryRequest({}).then((res) => {
            settingKompersSatjarCategory(res.data);
        });
    }

    const settingKompersSatjarCategory = (res) => {
        var datas = [];
        let activeIdx = 0;
        if (savedState?.kompersSatjarCategoryActive?.id) {
            activeIdx = res.findIndex((x) => x.id === savedState.kompersSatjarCategoryActive.id);
            if (activeIdx < 0) activeIdx = 0;
        }
        res.forEach((item, index) => {
            datas.push({
                id: item.id,
                kompers_satjar_categorys_id: item.kompers_satjar_categorys_id,
                category: item.category,
                sub_category: item.sub_category,
                isActive: index === activeIdx ? true : false,
            });
        });
        setKompersSatjarCategory([...datas]);
        setKompersSatjarCategoryActive({ ...datas[activeIdx] });
        getKompersSatjar({ category: datas?.[activeIdx]?.category, sub_category: datas?.[activeIdx]?.sub_category });
    };

    const getKompersSatjar = async ({ category = '', sub_category = '' }) => {
        await getKompersSatjarRequest({ filter: `part=${filter.part?.key ?? ''}&satuan_id=${filter.satuan_id?.id ?? ''}&category=${category}&sub_category=${sub_category}` }).then((res) => {
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
        getKompersSatjar({ category: kompersSatjarCategory[indexItem].category, sub_category: kompersSatjarCategory[indexItem].sub_category });
    };

    const onShowConfirmDelete = (kompers_satjar_id) => {
        setElement(<ConfirmDeleteModal onClickOutside={() => setElement(false)} onCancel={() => setElement(false)} onSave={() => onDeleteKompersSatjar({ kompers_satjar_id: kompers_satjar_id })} />);
    };

    const onDeleteKompersSatjar = async ({ kompers_satjar_id = null }) => {
        await deleteKompersSatjarRequest({ kompers_satjar_id: kompers_satjar_id }).then((res) => {
            setElement(false);
            getKompersSatjar({ category: res.category });
        });
    };

    useEffect(() => {
        getKompersSatjarCategory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter]);

    useEffect(() => {
        setPageState('kompers_satjar', { filter, kompersSatjarCategoryActive });
    }, [filter, kompersSatjarCategoryActive]);

    return <KompersSatjarContext.Provider value={{ navigation, element, filter, kompersSatjar, kompersSatjarCategory, kompersSatjarCategoryActive, onTabSwitch, onFilter, onShowConfirmDelete }}>{children}</KompersSatjarContext.Provider>;
};

export const UseKompersSatjarContext = () => {
    return useContext(KompersSatjarContext);
};
