import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteSatuanRequest, getSatuanRequest } from "../../api/SatuanRequest";
import { ConfirmDeleteModal } from "../../components";
import { SatuanPersonilSetting } from "../../pages/setting/personil/component"

const SettingPersonilContext = createContext();

export const SettingPersonilContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const [element, setElement] = useState(false);
    const [satuan, setSatuan] = useState({});
    const [tabsActive, setTabsActive] = useState({});
    const [tabs, setTabs] = useState([
        {
            index: 0,
            title: 'Satuan',
            page: 1,
            page_title: 'Manajemen Satuan',
            on_click: () => getSatuan(),
            isActive: true,
        }
    ]);

    const getSatuan = async () => {
        await getSatuanRequest().then((res) => {
            setSatuan(res);
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
            1: <SatuanPersonilSetting satuan={satuan} onShowConfirmDelete={(itemId) => setElement(<ConfirmDeleteModal onClickOutside={() => setElement(false)} onCancel={() => setElement(false)} onSave={() => onDeleteSatuan({ satuan_id: itemId })} />)} />
        };

        return content[page];
    }

    const onDeleteSatuan = async ({ satuan_id = null }) => {
        await deleteSatuanRequest({ satuan_id: satuan_id }).then((res) => {
            setElement(false);
            onTabSwitch(tabsActive.index);
        });
    }

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