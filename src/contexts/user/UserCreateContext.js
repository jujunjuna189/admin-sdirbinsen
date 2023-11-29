import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPermissionRequest } from "../../api/PermissionRequest";
import { createUserPermissionRequest } from "../../api/UserPermissionRequest";
import { createUserRequest } from "../../api/UserRequest";

const UserCreateContext = createContext();

export const UserCreateContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const [permission, setPermission] = useState({});
    const [controller, setController] = useState({});
    const [errors, setErrors] = useState({});
    const [dataSaved, setDataSaved] = useState({});
    const [stepActive, setStepActive] = useState({});
    const [step, setStep] = useState([
        {
            nav: () => navigation(-1),
            title: "Tambah User",
            page: 1,
            on_load: () => { },
            isActive: true,
        },
        {
            nav: () => onTabSwitch(0),
            title: "Atur Hak Akses",
            page: 2,
            on_load: () => getPermission(),
            isActive: false,
        },
    ]);

    const onSetController = (field, value) => {
        setController({ ...controller, [field]: value });
    }

    const onTabSwitch = (indexItem) => {
        step.forEach((item, index) => {
            step[index].isActive = false;
        });

        step[indexItem].isActive = true;
        step[indexItem].on_load();
        setStepActive(step[indexItem]);
        setStep([...step]);
    }

    const getPermission = async () => {
        await getPermissionRequest().then((res) => {
            setPermission(res);
        });
    }

    const onCheckedPermission = (itemParent, itemIndexChild, value) => {
        const permission_data = permission[itemParent][itemIndexChild];
        let dataBatch = controller.permission ?? {};
        if (value) {
            dataBatch = { ...dataBatch, [permission_data.original_data.id]: true };
        } else {
            delete dataBatch[permission_data.original_data.id];
        }

        onSetController('permission', dataBatch);
    }

    const saveUser = async () => {
        let dataBatch = { ...controller };
        dataBatch.role = controller?.role?.name_lower ?? '';
        let res = {};
        if (dataSaved.user) {
            res = dataSaved.user;
        } else {
            res = await createUserRequest({ body: dataBatch }).then((res) => {
                res?.errors && setErrors(res?.errors);
                res?.errors && onTabSwitch(0);
                !res.errors && setDataSaved({ user: res });
                return res?.errors ? false : res;
            });
        }

        return res;
    }

    const savePermission = async (user) => {
        let dataBatch = { ...controller };
        dataBatch.user_id = user?.id ?? 0;
        dataBatch.permission_id = Object.keys(dataBatch.permission ?? {});
        let res = await createUserPermissionRequest({ body: dataBatch }).then((res) => {
            res?.errors && setErrors(res?.errors);
            res?.errors && onTabSwitch(1);
            return res?.errors ? false : res;
        });
        return res;
    }

    const onSave = async () => {
        await saveUser().then(async (res) => {
            res && await savePermission(res).then((res_permission) => {
                res_permission && navigation('/user');
            });
        });
    }

    const onSaveAndAdd = async () => {
        await saveUser().then(async (res) => {
            res && await savePermission(res).then((res_permission) => {
                res_permission && setErrors({});
                res_permission && setController({});
                res_permission && onTabSwitch(0);
            });
        });
    }

    useEffect(() => {
        onTabSwitch(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <UserCreateContext.Provider value={{ navigation, controller, errors, onSetController, permission, step, stepActive, onTabSwitch, onCheckedPermission, onSaveAndAdd, onSave }}>
            {children}
        </UserCreateContext.Provider>
    );
}

export const UseUserCreateContext = () => {
    return useContext(UserCreateContext);
}