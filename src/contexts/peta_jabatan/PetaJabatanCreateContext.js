import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPetaJabatanRequest } from "../../api/PetaJabatanRequest";
import { ErrorPopup, LoaderPopup, SuccessPopup } from "../../components";
import { getLocalUser } from "../../utils";

const PetaJabatanCreateContext = createContext();

export const PetaJabatanCreateContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const user = getLocalUser();
    const [element, setElement] = useState(false);
    const [controller, setController] = useState({});
    const [errors, setErrors] = useState({});

    const onSetController = (field, value) => {
        setController({ ...controller, [field]: value });
    };

    const onSave = async () => {
        setElement(<LoaderPopup />);
        let dataBatch = { ...controller };
        dataBatch.personil_id = controller.personil.id;
        await createPetaJabatanRequest({ body: dataBatch }).then((res) => {
            res?.errors && setErrors(res?.errors);
            res?.errors && setElement(<ErrorPopup />);
            !res?.errors && setElement(<SuccessPopup />);
            setTimeout(() => {
                setElement(false);
                !res?.errors && navigation(`/personil/peta_jabatan`);
            }, 1000);
        });
    };

    const onSaveAndAdd = async () => {
        setElement(<LoaderPopup />);
        let dataBatch = { ...controller };
        dataBatch.personil_id = controller.personil.id;
        await createPetaJabatanRequest({ body: dataBatch }).then((res) => {
            res?.errors && setErrors(res?.errors);
            res?.errors && setElement(<ErrorPopup />);
            !res?.errors && setElement(<SuccessPopup />);
            setTimeout(() => {
                setElement(false);
                !res?.errors && setController({});
            }, 1000);
        });
    };

    return (
        <PetaJabatanCreateContext.Provider value={{ navigation, user, element, controller, errors, onSetController, onSave, onSaveAndAdd }}>
            {children}
        </PetaJabatanCreateContext.Provider>
    );
}

export const UsePetaJabatanCreateContext = () => {
    return useContext(PetaJabatanCreateContext);
}