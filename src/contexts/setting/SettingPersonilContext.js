import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteGolJabatanRequest, getGolJabatanRequest } from "../../api/GolJabatanRequest";
// import { deleteJabatanRequest, getJabatanRequest } from "../../api/JabatanRequest";
import { deleteKorpsRequest, getKorpsRequest } from "../../api/KorpsRequest";
import { deletePangkatRequest, getPangkatRequest } from "../../api/PangkatRequest";
import { deleteSatuanRequest, getSatuanRequest } from "../../api/SatuanRequest";
import { ConfirmDeleteModal } from "../../components";
import { GolJabatanPersonilSetting, KorpsPersonilSetting, PangkatPersonilSetting, SatuanPersonilSetting } from "../../pages/setting/personil/component"

const SettingPersonilContext = createContext();

export const SettingPersonilContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const [element, setElement] = useState(false);
    const [satuan, setSatuan] = useState({});
    const [pangkat, setPangkat] = useState({});
    const [korps, setKorps] = useState({});
    // const [jabatan, setJabatan] = useState({});
    const [golJabatan, setGolJabatan] = useState({});
    const [tabsActive, setTabsActive] = useState({});
    const [tabs, setTabs] = useState([
        {
            index: 0,
            title: 'Satuan',
            page: 1,
            page_title: 'Manajemen Satuan',
            on_click: () => getSatuan(),
            isActive: true,
        },
        {
            index: 1,
            title: 'Golongan Jabatan',
            page: 2,
            page_title: 'Manajemen Golongan Jabatan',
            on_click: () => getGolJabatan(),
            isActive: false,
        },
        // {
        //     index: 2,
        //     title: 'Jabatan',
        //     page: 3,
        //     page_title: 'Manajemen Jabatan',
        //     on_click: () => getJabatan(),
        //     isActive: false,
        // },
        {
            index: 2,
            title: 'Pangkat',
            page: 3,
            page_title: 'Manajemen Pangkat',
            on_click: () => getPangkat(),
            isActive: false,
        },
        {
            index: 3,
            title: 'Korps',
            page: 4,
            page_title: 'Manajemen Korps',
            on_click: () => getKorps(),
            isActive: false,
        },
    ]);

    const getSatuan = async () => {
        await getSatuanRequest({}).then((res) => {
            setSatuan(res);
        });
    }

    const getPangkat = async () => {
        await getPangkatRequest({}).then((res) => {
            setPangkat(res);
        });
    }

    const getKorps = async () => {
        await getKorpsRequest({}).then((res) => {
            setKorps(res);
        });
    }

    // const getJabatan = async () => {
    //     await getJabatanRequest({}).then((res) => {
    //         setJabatan(res);
    //     });
    // }

    const getGolJabatan = async () => {
        await getGolJabatanRequest({}).then((res) => {
            setGolJabatan(res);
        });
    }

    const onTabSwitch = (indexItem) => {
        tabs.forEach((item, index) => {
            tabs[index].isActive = false;
        });

        tabs[indexItem].isActive = true;
        tabs[indexItem].on_click();
        setTabsActive(tabs[indexItem]);
        setTabs([...tabs]);
    }

    const onGetContent = (page) => {
        const content = {
            1: <SatuanPersonilSetting satuan={satuan} onShowConfirmDelete={(itemId) => setElement(<ConfirmDeleteModal onClickOutside={() => setElement(false)} onCancel={() => setElement(false)} onSave={() => onDeleteSatuan({ satuan_id: itemId })} />)} />,
            2: <GolJabatanPersonilSetting golJabatan={golJabatan} onAdd={() => getGolJabatan()} onUpdate={() => getGolJabatan()} onShowConfirmDelete={(itemId) => setElement(<ConfirmDeleteModal onClickOutside={() => setElement(false)} onCancel={() => setElement(false)} onSave={() => onDeleteGolJabatan({ gol_jabatan_id: itemId })} />)} />,
            // 3: <JabatanPersonilSetting jabatan={jabatan} onAdd={() => getJabatan()} onUpdate={() => getJabatan()} onShowConfirmDelete={(itemId) => setElement(<ConfirmDeleteModal onClickOutside={() => setElement(false)} onCancel={() => setElement(false)} onSave={() => onDeleteJabatan({ jabatan_id: itemId })} />)} />,
            3: <PangkatPersonilSetting pangkat={pangkat} onAdd={() => getPangkat()} onUpdate={() => getPangkat()} onShowConfirmDelete={(itemId) => setElement(<ConfirmDeleteModal onClickOutside={() => setElement(false)} onCancel={() => setElement(false)} onSave={() => onDeletePangkat({ pangkat_id: itemId })} />)} />,
            4: <KorpsPersonilSetting korps={korps} onAdd={() => getKorps()} onUpdate={() => getKorps()} onShowConfirmDelete={(itemId) => setElement(<ConfirmDeleteModal onClickOutside={() => setElement(false)} onCancel={() => setElement(false)} onSave={() => onDeleteKorps({ korps_id: itemId })} />)} />
        };

        return content[page];
    }

    const onDeleteSatuan = async ({ satuan_id = null }) => {
        await deleteSatuanRequest({ satuan_id: satuan_id }).then((res) => {
            setElement(false);
            onTabSwitch(tabsActive.index);
        });
    }

    const onDeletePangkat = async ({ pangkat_id = null }) => {
        await deletePangkatRequest({ pangkat_id: pangkat_id }).then((res) => {
            setElement(false);
            onTabSwitch(tabsActive.index);
        });
    }

    const onDeleteKorps = async ({ korps_id = null }) => {
        await deleteKorpsRequest({ korps_id: korps_id }).then((res) => {
            setElement(false);
            onTabSwitch(tabsActive.index);
        });
    }

    const onDeleteGolJabatan = async ({ gol_jabatan_id = null }) => {
        await deleteGolJabatanRequest({ gol_jabatan_id: gol_jabatan_id }).then((res) => {
            setElement(false);
            onTabSwitch(tabsActive.index);
        });
    }

    // const onDeleteJabatan = async ({ jabatan_id = null }) => {
    //     await deleteJabatanRequest({ jabatan_id: jabatan_id }).then((res) => {
    //         setElement(false);
    //         onTabSwitch(tabsActive.index);
    //     });
    // }

    useEffect(() => {
        onTabSwitch(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <SettingPersonilContext.Provider value={{ navigation, element, tabs, tabsActive, onTabSwitch, setTabs, satuan, onGetContent }}>
            {children}
        </SettingPersonilContext.Provider>
    );
}

export const UseSettingPersonilContext = () => {
    return useContext(SettingPersonilContext);
}