import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getPersonilDetailRequest, updatePersonilRequest } from "../../api/PersonilRequest";
import { ErrorPopup, LoaderPopup, SuccessPopup } from "../../components";

const PersonilUpdateContext = createContext();

export const PersonilUpdateContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const param = useParams();
    const [element, setElement] = useState(false);
    const [formContent, setFormContent] = useState('form');
    const [controller, setController] = useState({});
    const [errors, setErrors] = useState({});

    const onGetPersonilDetail = async () => {
        await getPersonilDetailRequest({ id: param.id }).then((res) => {
            res === undefined && (res = {});
            res === null && (res = {});
            settingController(res);
        });
    }

    const settingController = (res) => {
        console.log(res);
        let dataBatch = {
            picture: {
                preview: res.picture,
            },
            nrp: res.nrp,
            nama: res.nama,
            tanggal_lahir: res.tanggal_lahir,
            tempat_lahir: res.tempat_lahir,
            agama: res.agama,
            suku_bangsa: res.suku_bangsa,
            golongan_darah: res.golongan_darah,
            satuan: res.satuan,
            sumber_pa: res.sumber_pa,
            jabatan: res.jabatan,
            pangkat: res.pangkat,
            korps: res.korps,
            psi: res.psi,
            tmt_1: res.tmt_1,
            tmt_2: res.tmt_2,
            tmt_tni: res.tmt_tni,
            tmt_jab: res.tmt_jab,
        };

        setController(dataBatch);
    }

    const onTabFormContent = (code) => {
        setFormContent(code);
    }

    const onSetController = (field, value) => {
        setController({ ...controller, [field]: value });
    }

    const onSave = async () => {
        setElement(<LoaderPopup />);
        let dataBatch = { ...controller };
        dataBatch.picture?.file ? (dataBatch.picture = dataBatch.picture?.file ?? null) : (delete dataBatch.picture);
        dataBatch.satuan_id = dataBatch.satuan?.id ?? null;
        dataBatch.status = 'Aktif';
        await updatePersonilRequest({ personil_id: param.id, body: dataBatch }).then((res) => {
            res?.errors && setErrors(res?.errors);
            res?.errors && setElement(<ErrorPopup />);
            !res?.errors && setElement(<SuccessPopup />);
            setTimeout(() => { setElement(false); !res?.errors && navigation(`/personil/detail/${param.id}`); }, 1000);
        });
    }

    useEffect(() => {
        onGetPersonilDetail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <PersonilUpdateContext.Provider value={{ navigation, element, formContent, onTabFormContent, controller, errors, onSetController, onSave }}>
            {children}
        </PersonilUpdateContext.Provider>
    );
}

export const UsePersonilUpdateContext = () => {
    return useContext(PersonilUpdateContext);
}