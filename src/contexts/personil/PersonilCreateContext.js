import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPersonilRequest } from "../../api/PersonilRequest";
import { ErrorPopup, LoaderPopup, SuccessPopup } from "../../components";

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
        dataBatch.satuan_id = dataBatch.satuan?.id ?? null;
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
        dataBatch.satuan = dataBatch.satuan?.nama ?? null;
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