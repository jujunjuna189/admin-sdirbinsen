import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deletePetaJabatanRequest, getPetaJabatanRequest } from "../../api/PetaJabatanRequest";
import { ConfirmDeleteModal } from "../../components";
import { getLocalUser } from "../../utils";

const PetaJabatanContext = createContext();

export const PetaJabatanContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const user = getLocalUser();
    const [element, setElement] = useState(false);
    const [petaJabatan, setPetaJabatan] = useState([]);

    const onGetPetaJabatan = async () => {
        setPetaJabatan({});
        await getPetaJabatanRequest().then((res) => {
            res === undefined && (res = {});
            res === null && (res = {});
            setPetaJabatan(res);
        });
    }

    const onShowConfirmDelete = (peta_jabatan_id) => {
        setElement(<ConfirmDeleteModal onClickOutside={() => setElement(false)} onCancel={() => setElement(false)} onSave={() => onDeletePetaJabatan({ peta_jabatan_id: peta_jabatan_id })} />);
    };

    const onDeletePetaJabatan = async ({ peta_jabatan_id = null }) => {
        await deletePetaJabatanRequest({ peta_jabatan_id: peta_jabatan_id }).then((res) => {
            setElement(false);
            onGetPetaJabatan();
        });
    };

    useEffect(() => {
        onGetPetaJabatan();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <PetaJabatanContext.Provider value={{ navigation, user, element, petaJabatan, setElement, setPetaJabatan, onShowConfirmDelete }}>
            {children}
        </PetaJabatanContext.Provider>
    );
}

export const UsePetaJabatanContext = () => {
    return useContext(PetaJabatanContext);
}