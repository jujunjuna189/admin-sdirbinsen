import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteMaterialRequest, getMaterialRequest } from "../../api/MaterialRequest"
import { ConfirmDeleteModal } from "../../components";

const MaterialContext = createContext();

export const MaterialContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const param = useParams();
    const [element, setElement] = useState(false);
    const [material, setMaterial] = useState({});

    const onGetMaterial = async () => {
        setMaterial({});
        await getMaterialRequest({ kategori: param.kategori }).then((res) => {
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [param]);

    return (
        <MaterialContext.Provider value={{ navigation, element, param, material, onShowConfirmDelete }}>
            {children}
        </MaterialContext.Provider>
    );
}

export const UseMaterialContext = () => {
    return useContext(MaterialContext);
}