import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteMaterialRequest, getMaterialRequest } from "../../api/MaterialRequest"
import { ConfirmDeleteModal } from "../../components";

const MaterialContext = createContext();

export const MaterialContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const [element, setElement] = useState(false);
    const [material, setMaterial] = useState({});

    const onGetMaterial = async () => {
        setMaterial({});
        await getMaterialRequest().then((res) => {
            res === undefined && (res = {});
            res === null && (res = {});
            setMaterial(res);
        });
    }

    const onShowConfirmDelete = (material_id) => {
        setElement(<ConfirmDeleteModal onClickOutside={() => setElement(false)} onCancel={() => setElement(false)} onSave={() => onDeleteMaterial({ material_id: material_id })} />);
    }

    const onDeleteMaterial = async ({ material_id = null }) => {
        await deleteMaterialRequest({ material_id: material_id }).then((res) => {
            setElement(false);
            onGetMaterial();
        });
    }

    useEffect(() => {
        onGetMaterial();
    }, []);

    return (
        <MaterialContext.Provider value={{ navigation, element, material, onShowConfirmDelete }}>
            {children}
        </MaterialContext.Provider>
    );
}

export const UseMaterialContext = () => {
    return useContext(MaterialContext);
}