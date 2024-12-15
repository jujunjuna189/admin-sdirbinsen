import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getSatuanRequest } from "../../api/SatuanRequest";
import { getSiapsatRequest } from "../../api/SiapsatRequest";
import { SiapsatSatgasRiwayatPage, SiapsatSatgasRotasiPage, SiapsatSatgasSaatIniPage } from "../../pages/siapsat_satgas/component";

const SiapsatSatgasContext = createContext();

export const SiapsatSatgasContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const location = useLocation();
    const [satuan, setSatuan] = useState({});
    const [satuanData, setSatuanData] = useState({});
    const [siapsat, setSiapsat] = useState({});
    const [menu, setMenu] = useState({});
    const [menus, setMenus] = useState([
        {
            title: 'Data Satgas Saat Ini',
            page: 1,
            isActive: false,
        },
        {
            title: 'Rotasi Satgas',
            page: 2,
            isActive: false,
        },
        {
            title: 'Riwayat Satgas',
            page: 3,
            onLoad: () => getSatuan({ title: 'Riwayat Satgas' }),
            isActive: false,
        },
    ]);

    const onTabSwitch = (index) => {
        const menuIndex = menus.findIndex((x) => x.isActive === true);
        menuIndex >= 0 && (menus[menuIndex].isActive = false);

        menus[index].isActive = true;
        setMenus([...menus]);
        setMenu({ ...menus[index] });
        // onload
        if (menus[index].onLoad) menus[index].onLoad();
        onGetSiapsat({ title: menus[index].title });
    }

    const onGetContent = (page) => {
        const content = {
            1: <SiapsatSatgasSaatIniPage />,
            2: <SiapsatSatgasRotasiPage />,
            3: <SiapsatSatgasRiwayatPage />,
        };

        return content[page];
    }

    // End general

    // Riwayat state page
    const getSatuan = async ({ title }) => {
        await getSatuanRequest({}).then((res) => {
            res?.data?.length > 0 && (res.data[0].isActive = true);
            res?.data?.length > 0 && (setSatuanData(res.data[0]));
            res?.data?.length > 0 && (onGetSiapsat({ satuan_id: res.data[0].id, title: title }));
            setSatuan(res);
        });
    };

    const onChangeTab = (index) => {
        const satuanIndex = satuan.data.findIndex((x) => x.isActive === true);
        satuanIndex >= 0 && (satuan.data[satuanIndex].isActive = false);

        satuan.data[index].isActive = true;
        setSatuan({ ...satuan });
        setSatuanData(satuan.data[index]);
        onGetSiapsat({ satuan_id: satuan.data[index].id });
    }

    const onGetSiapsat = async ({ satuan_id, title }) => {
        await getSiapsatRequest({ filter: `category=satgas&satuan_id=${satuan_id ?? 'empty'}&title=${title ?? menu.title}` }).then((res) => {
            setSiapsat({ ...siapsat, [title ?? menu.title]: { ...(res?.data?.[0] ?? {}) } });
        });
    }

    const onChangeTabSiapsat = (index) => {
        const siapsatIndex = siapsat.data.findIndex((x) => x.isActive === true);
        siapsatIndex >= 0 && (siapsat.data[siapsatIndex].isActive = false);

        siapsat.data[index].isActive = true;
        setSiapsat({ ...siapsat });
    }

    useEffect(() => {
        var tabIndex = menus.findIndex((x) => x.title === location.state?.sub_category);
        tabIndex = tabIndex < 0 ? 0 : tabIndex;
        onTabSwitch(tabIndex);
        console.log(tabIndex);
        console.log(location);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location.state]);

    return <SiapsatSatgasContext.Provider value={{ navigation, location, menu, menus, satuan, satuanData, siapsat, onGetContent, setSiapsat, onChangeTab, onTabSwitch, onChangeTabSiapsat }}>{children}</SiapsatSatgasContext.Provider>;
};

export const UseSiapsatSatgasContext = () => {
    return useContext(SiapsatSatgasContext);
};
