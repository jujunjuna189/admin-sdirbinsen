import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLocalUser } from "../../utils";

const PetaJabatanUpdateContext = createContext();

export const PetaJabatanUpdateContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const user = getLocalUser();
    const [element, setElement] = useState(false);
    const [petaJabatan, setPetaJabatan] = useState([]);

    return (
        <PetaJabatanUpdateContext.Provider value={{ navigation, user, element, petaJabatan, setElement, setPetaJabatan }}>
            {children}
        </PetaJabatanUpdateContext.Provider>
    );
}

export const UsePetaJabatanUpdateContext = () => {
    return useContext(PetaJabatanUpdateContext);
}