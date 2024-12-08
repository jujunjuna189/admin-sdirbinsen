import { createContext, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createAnnouncementRequest } from "../../api/AnnouncementRequest";
import { ErrorPopup, LoaderPopup, SuccessPopup } from "../../components";

const AnnouncementCreateContext = createContext();

export const AnnouncementCreateContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const location = useLocation();
    const [element, setElement] = useState(false);
    const [controller, setController] = useState({
        category: location.state?.category,
    });
    const [errors, setErrors] = useState({});

    const onSetController = (field, value) => {
        setController({ ...controller, [field]: value });
    };

    const onSave = async () => {
        setElement(<LoaderPopup />);
        let dataBatch = { ...controller };
        await createAnnouncementRequest({ body: dataBatch }).then((res) => {
            res?.errors && setErrors(res?.errors);
            res?.errors && setElement(<ErrorPopup />);
            !res?.errors && setElement(<SuccessPopup />);
            setTimeout(() => {
                setElement(false);
                !res?.errors && navigation(`/announcement`, { state: { ...location.state } });
            }, 1000);
        });
    };

    const onSaveAndAdd = async () => {
        setElement(<LoaderPopup />);
        let dataBatch = { ...controller };
        await createAnnouncementRequest({ body: dataBatch }).then((res) => {
            res?.errors && setErrors(res?.errors);
            res?.errors && setElement(<ErrorPopup />);
            !res?.errors && setElement(<SuccessPopup />);
            setTimeout(() => {
                setElement(false);
                !res?.errors && setController({ category: location.state?.category });
            }, 1000);
        });
    };

    return (
        <AnnouncementCreateContext.Provider value={{ navigation, location, element, controller, errors, setErrors, onSetController, onSaveAndAdd, onSave }}>
            {children}
        </AnnouncementCreateContext.Provider>
    );
}

export const UseAnnouncementCreateContext = () => {
    return useContext(AnnouncementCreateContext);
}