import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deletePersonilRequest, getPersonilRequest } from "../../api/PersonilRequest"
import { getSumberPAPersonilRequest } from "../../api/SumberPARequest";
import { ConfirmDeleteModal } from "../../components";
import { getLocalUser } from "../../utils";

const PersonilContext = createContext();

export const PersonilContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const [element, setElement] = useState(false);
    const [personil, setPersonil] = useState({});
    const [sumberPaActiveIndex, setSumberPaActiveIndex] = useState(0);
    const [sumberPa, setSumperPa] = useState([]);

    const getSumberPa = async () => {
        await getSumberPAPersonilRequest().then((res) => {
            var sumberPa = [];
            res.forEach((item, index) => {
                sumberPa.push({ title: item, isActive: index === 0 ? true : false });
            })
            setSumperPa(sumberPa);
            setSumberPaActiveIndex(sumberPa[0]);
            onGetPersonil({ sumberPa: sumberPa[0].title });
        });
    }

    const onGetPersonil = async ({ sumberPa, search, page }) => {
        setPersonil({});
        await getPersonilRequest({ sumber_pa: sumberPa, satuan_id: getLocalUser()?.auth?.user?.satuan_id, search: search, page: page }).then((res) => {
            res === undefined && (res = {});
            res === null && (res = {});
            setPersonil(res);
        });
    }

    const onTabSwitch = (indexItem) => {
        sumberPa.forEach((item, index) => {
            sumberPa[index].isActive = false;
        });

        sumberPa[indexItem].isActive = true;
        onGetPersonil({ sumberPa: sumberPa[indexItem].title });
        setSumberPaActiveIndex(indexItem);
        setSumperPa([...sumberPa]);
    }

    const onNextPage = ({ page }) => {
        onGetPersonil({ sumberPa: sumberPaActiveIndex.title, page: page });
    }

    const onSearch = (value) => {
        console.log(value);
        onGetPersonil({ sumberPa: sumberPaActiveIndex.title, search: value });
    }

    const onShowConfirmDelete = (personil_id) => {
        setElement(<ConfirmDeleteModal onClickOutside={() => setElement(false)} onCancel={() => setElement(false)} onSave={() => onDeleteMaterial({ personil_id: personil_id })} />);
    }

    const onDeleteMaterial = async ({ personil_id = null }) => {
        await deletePersonilRequest({ personil_id: personil_id }).then((res) => {
            setElement(false);
            onTabSwitch(sumberPaActiveIndex);
        });
    }

    useEffect(() => {
        getSumberPa();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <PersonilContext.Provider value={{ navigation, element, personil, sumberPa, onTabSwitch, onNextPage, onSearch, onShowConfirmDelete }}>
            {children}
        </PersonilContext.Provider>
    );
}

export const UsePersonilContext = () => {
    return useContext(PersonilContext);
}