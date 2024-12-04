import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPetaJabatanDetailRequest, updatePetaJabatanRequest } from "../../api/PetaJabatanRequest";
import { ErrorPopup, LoaderPopup, SuccessPopup } from "../../components";
import { dateFormatterV6, getLocalUser } from "../../utils";

const PetaJabatanUpdateContext = createContext();

export const PetaJabatanUpdateContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const user = getLocalUser();
    const params = useParams();
    const [element, setElement] = useState(false);
    const [controller, setController] = useState({});
    const [errors, setErrors] = useState({});

    const onSetController = (field, value) => {
        setController({ ...controller, [field]: value });
    };

    const onGetPetaJabatan = async () => {
        await getPetaJabatanDetailRequest({ id: params.id }).then((res) => {
            var dataBatch = {
                satuan_id: { id: res.satuan?.id, nama: res.satuan?.nama },
                personil: { id: res.personil?.id, nama: res.personil?.nama },
                kategori: res.kategori,
                golongan: res.golongan,
                jabatan: res.jabatan,
                tmt: res.personil?.tmt_jab,
            };
            setController(dataBatch);
        });
    }

    const onSave = async () => {
        setElement(<LoaderPopup />);
        let dataBatch = { ...controller };
        !getLocalUser()?.auth?.user?.satuan_id && (dataBatch.satuan_id = dataBatch.satuan_id?.id ?? null);
        getLocalUser()?.auth?.user?.satuan_id && (dataBatch.satuan_id = getLocalUser()?.auth?.user?.satuan_id ?? null);
        dataBatch.personil_id = controller?.personil?.id;
        dataBatch.tmt = controller?.personil?.tmt_jab != null ? dateFormatterV6(controller?.personil?.tmt_jab) : null;
        await updatePetaJabatanRequest({ peta_jabatan_id: params.id, body: dataBatch }).then((res) => {
            res?.errors && setErrors(res?.errors);
            res?.errors && setElement(<ErrorPopup />);
            !res?.errors && setElement(<SuccessPopup />);
            setTimeout(() => {
                setElement(false);
                !res?.errors && navigation(`/personil/peta_jabatan`);
            }, 1000);
        });
    };

    useEffect(() => {
        onGetPetaJabatan();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <PetaJabatanUpdateContext.Provider value={{ navigation, user, element, controller, errors, setElement, setController, setErrors, onSetController, onSave }}>
            {children}
        </PetaJabatanUpdateContext.Provider>
    );
}

export const UsePetaJabatanUpdateContext = () => {
    return useContext(PetaJabatanUpdateContext);
}