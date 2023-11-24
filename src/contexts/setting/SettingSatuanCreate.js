import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSatuanRequest } from "../../api/SatuanRequest";
import { ErrorPopup, LoaderPopup, SuccessPopup } from "../../components";

const SettingSatuanCreateContext = createContext();

export const SettingSatuanCreateContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const [element, setElement] = useState(false);
    const [controller, setController] = useState({});
    const [errors, setErrors] = useState({});

    const onSetController = (field, value) => {
        setController({ ...controller, [field]: value });
    }

    const onSave = async () => {
        setElement(<LoaderPopup />);
        let dataBatch = { ...controller };
        dataBatch.logo = dataBatch.picture?.file ?? null;;
        dataBatch.sejarah = '-';
        dataBatch.hymne = '-';
        dataBatch.mars = '-';
        dataBatch.struktur_organisasi = '-';
        dataBatch.struktur_organisasi_url = '-';
        dataBatch.latitude = '0.9';
        dataBatch.longitude = '0.9';
        dataBatch.status = 'Aktif';
        await createSatuanRequest({ body: dataBatch }).then((res) => {
            res?.errors && setErrors(res?.errors);
            res?.errors && setElement(<ErrorPopup />);
            !res?.errors && setElement(<SuccessPopup />);
            setTimeout(() => { setElement(false); !res?.errors && navigation('/setting/personil'); }, 1000);
        });
    }

    const onSaveAndAdd = async () => {
        setElement(<LoaderPopup />);
        let dataBatch = { ...controller };
        dataBatch.logo = dataBatch.picture?.file ?? null;;
        dataBatch.sejarah = '-';
        dataBatch.hymne = '-';
        dataBatch.mars = '-';
        dataBatch.struktur_organisasi = '-';
        dataBatch.struktur_organisasi_url = '-';
        dataBatch.latitude = '0.9';
        dataBatch.longitude = '0.9';
        dataBatch.status = 'Aktif';
        await createSatuanRequest({ body: dataBatch }).then((res) => {
            res?.errors && setErrors(res?.errors);
            res?.errors && setElement(<ErrorPopup />);
            !res?.errors && setElement(<SuccessPopup />);
            setTimeout(() => { setElement(false); !res?.errors && setController({}); }, 1000);
        });
    }

    return (
        <SettingSatuanCreateContext.Provider value={{ navigation, element, controller, errors, onSetController, onSaveAndAdd, onSave }}>
            {children}
        </SettingSatuanCreateContext.Provider>
    );
}

export const UseSettingSatuanCreateContext = () => {
    return useContext(SettingSatuanCreateContext);
}