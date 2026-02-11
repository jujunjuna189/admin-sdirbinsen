import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteAnnouncementRequest, getAnnouncementRequest } from "../../api/AnnouncementRequest";
import { ConfirmDeleteModal } from "../../components";
import { getPageState, setPageState } from "../../utils";

const AnnouncementContext = createContext();

export const AnnouncementContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const location = useLocation();
    const savedState = getPageState('announcement');
    const [element, setElement] = useState(false);
    const [announcement, setAnnouncement] = useState({});

    const onGetAnnouncement = async () => {
        const category = location.state?.category ?? savedState?.category ?? '';
        await getAnnouncementRequest({ filter: `category=${category}` }).then((res) => {
            setAnnouncement(res);
        });
    };

    const onShowConfirmDelete = (announcement_id) => {
        setElement(<ConfirmDeleteModal onClickOutside={() => setElement(false)} onCancel={() => setElement(false)} onSave={() => onDeleteAnnouncement({ announcement_id: announcement_id })} />);
    };

    const onDeleteAnnouncement = async ({ announcement_id = null }) => {
        await deleteAnnouncementRequest({ announcement_id: announcement_id }).then((res) => {
            setElement(false);
            onGetAnnouncement({ category: res.category });
        });
    };

    useEffect(() => {
        onGetAnnouncement();
        if (location.state?.category) {
            setPageState('announcement', { category: location.state.category });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location]);

    return (
        <AnnouncementContext.Provider value={{ navigation, location, element, setElement, announcement, setAnnouncement, onShowConfirmDelete }}>
            {children}
        </AnnouncementContext.Provider>
    );
}

export const UseAnnouncementContext = () => {
    return useContext(AnnouncementContext);
}