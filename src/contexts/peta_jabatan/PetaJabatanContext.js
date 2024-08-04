import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPetaJabatanRequest } from "../../api/PetaJabatanRequest";
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

    useEffect(() => {
        onGetPetaJabatan();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <PetaJabatanContext.Provider value={{ navigation, user, element, petaJabatan, setElement, setPetaJabatan }}>
            {children}
        </PetaJabatanContext.Provider>
    );
}

export const UsePetaJabatanContext = () => {
    return useContext(PetaJabatanContext);
}