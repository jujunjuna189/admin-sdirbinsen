import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getAnnouncementRequest, updateAnnouncementRequest } from "../../api/AnnouncementRequest";
import { ErrorPopup, LoaderPopup, SuccessPopup } from "../../components";

const AnnouncementUpdateContext = createContext();

export const AnnouncementUpdateContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const param = useParams();
    const location = useLocation();
    const [element, setElement] = useState(false);
    const [controller, setController] = useState({
        category: location.state?.category,
    });
    const [errors, setErrors] = useState({});

    const onGetAnnouncementDetail = async () => {
        await getAnnouncementRequest({ filter: `id=${param.id}` }).then((res) => {
            res === undefined && (res = {});
            res === null && (res = {});
            settingController(res.data?.[0] ?? {});
        });
    }

    const settingController = (res) => {
        let dataBatch = {
            message: res.message,
        };

        setController(dataBatch);
    }

    const onSetController = (field, value) => {
        setController({ ...controller, [field]: value });
    };

    const onSave = async () => {
        setElement(<LoaderPopup />);
        let dataBatch = { ...controller };
        dataBatch.file = dataBatch.file?.size != null ? dataBatch.file : null;
        await updateAnnouncementRequest({ announcement_id: param.id, body: dataBatch }).then((res) => {
            res?.errors && setErrors(res?.errors);
            res?.errors && setElement(<ErrorPopup />);
            !res?.errors && setElement(<SuccessPopup />);
            setTimeout(() => {
                setElement(false);
                !res?.errors && navigation(`/announcement`, { state: { ...location.state } });
            }, 1000);
        });
    };

    useEffect(() => {
        onGetAnnouncementDetail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <AnnouncementUpdateContext.Provider value={{ navigation, location, element, controller, errors, setErrors, onSetController, onSave }}>
            {children}
        </AnnouncementUpdateContext.Provider>
    );
}

export const UseAnnouncementUpdateContext = () => {
    return useContext(AnnouncementUpdateContext);
}