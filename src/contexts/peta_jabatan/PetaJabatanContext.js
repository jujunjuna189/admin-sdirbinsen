import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLocalUser } from "../../utils";

const PetaJabatanContext = createContext();

export const PetaJabatanContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const user = getLocalUser();
    const [element, setElement] = useState(false);
    const [petaJabatan, setPetaJabatan] = useState([]);

    return (
        <PetaJabatanContext.Provider value={{ navigation, user, element, petaJabatan, setElement, setPetaJabatan }}>
            {children}
        </PetaJabatanContext.Provider>
    );
}

export const UsePetaJabatanContext = () => {
    return useContext(PetaJabatanContext);
}