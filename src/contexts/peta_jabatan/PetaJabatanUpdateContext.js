import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPetaJabatanDetailRequest, updatePetaJabatanRequest } from "../../api/PetaJabatanRequest";
import { ErrorPopup, LoaderPopup, SuccessPopup } from "../../components";
import { getLocalUser } from "../../utils";

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
                personil: { id: res.personil.id, nama: res.personil.nama },
                kategori: res.kategori,
                golongan: res.golongan,
                jabatan: res.personil.jabatan,
                tmt: res.personil.tmt_jab,
            };
            setController(dataBatch);
        });
    }

    const onSave = async () => {
        setElement(<LoaderPopup />);
        let dataBatch = { ...controller };
        dataBatch.personil_id = controller.personil.id;
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