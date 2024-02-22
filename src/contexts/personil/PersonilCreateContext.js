import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPersonilRequest } from "../../api/PersonilRequest";
import { ErrorPopup, LoaderPopup, SuccessPopup } from "../../components";
import { getLocalUser } from "../../utils";

const PersonilCreateContext = createContext();

export const PersonilCreateContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const [element, setElement] = useState(false);
    const [formContent, setFormContent] = useState('form');
    const [controller, setController] = useState({});
    const [errors, setErrors] = useState({});

    const onTabFormContent = (code) => {
        setFormContent(code);
    }

    const onSetController = (field, value) => {
        setController({ ...controller, [field]: value });
    }

    const onSave = async () => {
        setElement(<LoaderPopup />);
        let dataBatch = { ...controller };
        dataBatch.picture = dataBatch.picture?.file ?? null;
        !getLocalUser()?.auth?.user?.satuan_id && (dataBatch.satuan_id = dataBatch.satuan?.id ?? null);
        getLocalUser()?.auth?.user?.satuan_id && (dataBatch.satuan_id = getLocalUser()?.auth?.user?.satuan_id ?? null);
        dataBatch.status = 'Aktif';
        await createPersonilRequest({ body: dataBatch }).then((res) => {
            res?.errors && setErrors(res?.errors);
            res?.errors && setElement(<ErrorPopup />);
            !res?.errors && setElement(<SuccessPopup />);
            setTimeout(() => { setElement(false); !res?.errors && navigation('/personil'); }, 1000);
        });
    }

    const onSaveAndAdd = async () => {
        setElement(<LoaderPopup />);
        let dataBatch = { ...controller };
        dataBatch.picture = dataBatch.picture?.file ?? null;
        !getLocalUser()?.auth?.user?.satuan_id && (dataBatch.satuan_id = dataBatch.satuan?.id ?? null);
        getLocalUser()?.auth?.user?.satuan_id && (dataBatch.satuan_id = getLocalUser()?.auth?.user?.satuan_id ?? null);
        dataBatch.status = 'Aktif';
        await createPersonilRequest({ body: dataBatch }).then((res) => {
            res?.errors && setErrors(res?.errors);
            res?.errors && setElement(<ErrorPopup />);
            !res?.errors && setElement(<SuccessPopup />);
            setTimeout(() => { setElement(false); !res?.errors && setController({}); }, 1000);
        });
    }

    return (
        <PersonilCreateContext.Provider value={{ navigation, element, formContent, onTabFormContent, controller, errors, onSetController, onSave, onSaveAndAdd }}>
            {children}
        </PersonilCreateContext.Provider>
    );
}

export const UsePersonilCreateContext = () => {
    return useContext(PersonilCreateContext);
}