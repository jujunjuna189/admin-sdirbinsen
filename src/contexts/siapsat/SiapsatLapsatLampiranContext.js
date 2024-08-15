import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteSiapsatLapsatLampiranRequest, getSiapsatLapsatLampiranRequest } from "../../api/SiapsatLapsatLampiranRequest";
import { ConfirmDeleteModal } from "../../components";

const SiapsatLapsatLampiranContext = createContext();

export const SiapsatLapsatLampiranContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const [element, setElement] = useState(false);
    const [categoryActive, setCategoryActive] = useState({});
    const [category, setCategory] = useState([
        {
            title: 'Data Pelanggaran',
            isActive: true,
        },
        {
            title: 'Data Operasi',
            isActive: false,
        },
        {
            title: 'Data Personil',
            isActive: false,
        },
        {
            title: 'Data Materiel',
            isActive: false,
        },
    ]);
    const [data, setData] = useState([]);


    const onGetData = async ({ kategori }) => {
        setData({});
        await getSiapsatLapsatLampiranRequest({ filter: `?kategori=${kategori}` }).then((res) => {
            res === undefined && (res = {});
            res === null && (res = {});
            setData(res);
        });
    };

    const onShowConfirmDelete = (id) => {
        setElement(<ConfirmDeleteModal onClickOutside={() => setElement(false)} onCancel={() => setElement(false)} onSave={() => onDeleteSiapsat({ id: id })} />);
    };

    const onDeleteSiapsat = async ({ id = null }) => {
        await deleteSiapsatLapsatLampiranRequest({ id: id }).then((res) => {
            setElement(false);
            onGetData();
        });
    };

    const onTabSwitch = (indexItem) => {
        category.forEach((item, index) => {
            category[index].isActive = false;
        });

        category[indexItem].isActive = true;
        setCategory([...category]);
        setCategoryActive({ ...category[indexItem] });
        onGetData({ kategori: category[indexItem].title });
    };

    useEffect(() => {
        onTabSwitch(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <SiapsatLapsatLampiranContext.Provider value={{ navigation, element, category, categoryActive, data, onTabSwitch, onShowConfirmDelete }}>{children}</SiapsatLapsatLampiranContext.Provider>;
};

export const UseSiapsatLapsatLampiranContext = () => {
    return useContext(SiapsatLapsatLampiranContext);
};
