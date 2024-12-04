import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deletePetaJabatanRequest, getPetaJabatanRequest } from "../../api/PetaJabatanRequest";
import { ConfirmDeleteModal } from "../../components";
import { getLocalUser } from "../../utils";

const PetaJabatanContext = createContext();

export const PetaJabatanContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const user = getLocalUser();
    const [filter, setFilter] = useState({});
    const [element, setElement] = useState(false);
    const [petaJabatan, setPetaJabatan] = useState([]);

    const onFilter = (field, value) => {
        setFilter({ ...filter, [field]: value });
    }

    const onGetPetaJabatan = async () => {
        setPetaJabatan({});
        // const satuan = (getLocalUser()?.auth?.user?.satuan_id === null && petaJabatan.length === 0) && await getSatuanRequest({ limit: 1 });
        // (getLocalUser()?.auth?.user?.satuan_id === null && petaJabatan.length === 0) && (filter.satuan_id = (satuan?.data?.[0]?.id ?? null));
        await getPetaJabatanRequest({ satuan_id: getLocalUser()?.auth?.user?.satuan_id ?? filter.satuan_id }).then((res) => {
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
    }, [filter]);

    return (
        <PetaJabatanContext.Provider value={{ navigation, user, element, petaJabatan, setElement, setPetaJabatan, onFilter, onShowConfirmDelete }}>
            {children}
        </PetaJabatanContext.Provider>
    );
}

export const UsePetaJabatanContext = () => {
    return useContext(PetaJabatanContext);
}