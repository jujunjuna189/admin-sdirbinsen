import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMaterialDetailRequest, updateMaterialRequest } from "../../api/MaterialRequest";
import { ErrorPopup, LoaderPopup, SuccessPopup } from "../../components";

const MaterialUpdateContext = createContext();

export const MaterialUpdateContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const param = useParams();
    const [element, setElement] = useState(false);
    const [controller, setController] = useState({});
    const [errors, setErrors] = useState({});

    const onGetMaterialDetail = async () => {
        await getMaterialDetailRequest({ id: param.id }).then((res) => {
            res === undefined && (res = {});
            res === null && (res = {});
            settingController(res);
        });
    }

    const settingController = (res) => {
        let dataBatch = {
            satuan_id: { ...res.satuan },
            nama: res.nama,
            file: res.file,
        };

        setController(dataBatch);
    }

    const onSetController = (field, value) => {
        setController({ ...controller, [field]: value });
    }

    const onSave = async () => {
        setElement(<LoaderPopup />);
        let dataBatch = { ...controller };
        dataBatch.satuan_id = dataBatch.satuan_id?.id ?? null;
        dataBatch.kondisi = 1;
        dataBatch.status = 'Baik';
        await updateMaterialRequest({ material_id: param.id, body: dataBatch }).then((res) => {
            res?.errors && setErrors(res?.errors);
            res?.errors && setElement(<ErrorPopup />);
            !res?.errors && setElement(<SuccessPopup />);
            setTimeout(() => { setElement(false); !res?.errors && navigation('/material'); }, 1000);
        });
    }

    useEffect(() => {
        onGetMaterialDetail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <MaterialUpdateContext.Provider value={{ navigation, element, controller, errors, onSetController, onSave }}>
            {children}
        </MaterialUpdateContext.Provider>
    );
}

export const UseMaterialUpdateContext = () => {
    return useContext(MaterialUpdateContext);
}