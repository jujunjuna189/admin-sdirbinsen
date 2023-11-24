import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deletePermissionRequest, getPermissionRequest } from "../../api/PermissionRequest";
import { deleteRoleRequest, getRoleRequest } from "../../api/RoleRequest";
import { ConfirmDeleteModal } from "../../components";
import { AddPermissionModal, AddRoleModal, PermissionSetting, RoleSetting } from "../../pages/setting/user/component";

const SettingUserContext = createContext();

export const SettingUserContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const [element, setElement] = useState(false);
    const [role, setRole] = useState({});
    const [permission, setPermission] = useState({});
    const [tabsActive, setTabsActive] = useState({});
    const [tabs, setTabs] = useState([
        {
            index: 0,
            title: 'Hak Akses',
            page: 1,
            page_title: 'Manejemen Hak Akses',
            on_load: () => getRole(),
            isActive: true,
        },
        {
            index: 0,
            title: 'Akses Perizinan',
            page: 2,
            page_title: 'Manejemen Akses Perizinan',
            on_load: () => getPermission(),
            isActive: false,
        },
    ]);

    const onTabSwitch = (indexItem) => {
        tabs.forEach((item, index) => {
            tabs[index].isActive = false;
        });

        tabs[indexItem].isActive = true;
        tabs[indexItem].on_load();
        setTabsActive(tabs[indexItem]);
        setTabs([...tabs]);
    }

    const getRole = async () => {
        await getRoleRequest().then((res) => {
            setRole(res);
        });
    }

    const getPermission = async () => {
        await getPermissionRequest().then((res) => {
            setPermission(res);
        });
    }

    const onGetContent = (page) => {
        const content = {
            1: <RoleSetting role={role} onAdd={() => setElement(<AddRoleModal onClickOutside={() => setElement(false)} onSave={() => { setElement(false); onTabSwitch(0) }} />)} onShowConfirmDelete={(itemId) => setElement(<ConfirmDeleteModal onClickOutside={() => setElement(false)} onCancel={() => setElement(false)} onSave={() => onDeleteRole({ itemId: itemId, tabIndex: 0 })} />)} />,
            2: <PermissionSetting permission={permission} onAdd={() => setElement(<AddPermissionModal onClickOutside={() => setElement(false)} onSave={() => { setElement(false); onTabSwitch(1) }} />)} onShowConfirmDelete={(itemId) => setElement(<ConfirmDeleteModal onClickOutside={() => setElement(false)} onCancel={() => setElement(false)} onSave={() => onDeletePermission({ itemId: itemId, tabIndex: 1 })} />)} />,
        };

        return content[page];
    }

    const onDeleteRole = async ({ itemId = null, tabIndex = null }) => {
        await deleteRoleRequest({ role_id: itemId }).then((res) => {
            setElement(false);
            onTabSwitch(tabIndex);
        });
    }

    const onDeletePermission = async ({ itemId = null, tabIndex = null }) => {
        await deletePermissionRequest({ permission_id: itemId }).then((res) => {
            setElement(false);
            onTabSwitch(tabIndex);
        });
    }

    useEffect(() => {
        onTabSwitch(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <SettingUserContext.Provider value={{ navigation, element, tabs, tabsActive, onTabSwitch, setTabs, onGetContent }}>
            {children}
        </SettingUserContext.Provider>
    );
}

export const UseSettingUserContext = () => {
    return useContext(SettingUserContext);
}