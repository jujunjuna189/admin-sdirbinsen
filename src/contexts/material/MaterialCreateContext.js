import { createContext, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createMaterialRequest } from "../../api/MaterialRequest";
import { ErrorPopup, LoaderPopup, SuccessPopup } from "../../components";

const MaterialCreateContext = createContext();

export const MaterialCreateContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const param = useParams();
    const [element, setElement] = useState(false);
    const [controller, setController] = useState({});
    const [errors, setErrors] = useState({});

    const onSetController = (field, value) => {
        setController({ ...controller, [field]: value });
    }

    const onSave = async () => {
        setElement(<LoaderPopup />);
        let dataBatch = { ...controller };
        dataBatch.satuan_id = dataBatch.satuan_id?.id ?? null;
        dataBatch.kategori = param.kategori;
        dataBatch.kondisi = 1;
        dataBatch.status = 'Baik';
        await createMaterialRequest({ body: dataBatch }).then((res) => {
            res?.errors && setErrors(res?.errors);
            res?.errors && setElement(<ErrorPopup />);
            !res?.errors && setElement(<SuccessPopup />);
            setTimeout(() => { setElement(false); !res?.errors && navigation(`/material/${param.kategori}`); }, 1000);
        });
    }

    const onSaveAndAdd = async () => {
        setElement(<LoaderPopup />);
        let dataBatch = { ...controller };
        dataBatch.satuan_id = dataBatch.satuan_id?.id ?? null;
        dataBatch.kategori = param.kategori;
        dataBatch.kondisi = 1;
        dataBatch.status = 'Baik';
        await createMaterialRequest({ body: dataBatch }).then((res) => {
            res?.errors && setErrors(res?.errors);
            res?.errors && setElement(<ErrorPopup />);
            !res?.errors && setElement(<SuccessPopup />);
            setTimeout(() => { setElement(false); !res?.errors && setController({}); }, 1000);
        });
    }

    return (
        <MaterialCreateContext.Provider value={{ navigation, element, controller, errors, onSetController, onSave, onSaveAndAdd }}>
            {children}
        </MaterialCreateContext.Provider>
    );
}

export const UseMaterialCreateContext = () => {
    return useContext(MaterialCreateContext);
}