import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deletePersonilRequest, getPersonilRequest } from "../../api/PersonilRequest";
import { getSumberPAPersonilRequest } from "../../api/SumberPARequest";
import { ConfirmDeleteModal } from "../../components";
import { getLocalUser, getPageState, setPageState } from "../../utils";

const PersonilContext = createContext({});

export const PersonilContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const savedState = getPageState('personil');
    const [filter, setFilter] = useState(savedState?.filter ?? {});
    const [currentPage, setCurrentPage] = useState(savedState?.page ?? 1);
    const [element, setElement] = useState(false);
    const [personil, setPersonil] = useState({});
    const [sumberPaActiveIndex, setSumberPaActiveIndex] = useState(savedState?.sumberPaActiveIndex ?? 0);
    const [sumberPa, setSumperPa] = useState([]);

    const getSumberPa = async () => {
        try {
            const res = await getSumberPAPersonilRequest();
            if (res) {
                const activeIdx = savedState?.sumberPaActiveIndex ?? 0;
                const newSumberPa = res.map((item, index) => ({
                    title: item,
                    isActive: index === activeIdx
                }));
                setSumperPa(newSumberPa);
                setSumberPaActiveIndex(activeIdx);
                onGetPersonil({ 
                    sumberPa: newSumberPa[activeIdx]?.title, 
                    page: currentPage,
                    search: filter.search,
                    letting: filter.letting
                });
            }
        } catch (error) {
            console.error("Error in getSumberPa:", error);
        }
    };

    const onGetPersonil = async ({ sumberPa, search, letting, page }) => {
        setPersonil({});
        try {
            const res = await getPersonilRequest({ 
                sumber_pa: sumberPa, 
                satuan_id: getLocalUser()?.auth?.user?.satuan_id, 
                letting: letting, 
                search: search, 
                page: page 
            });
            setPersonil(res || {});
        } catch (error) {
            console.error("Error in onGetPersonil:", error);
            setPersonil({});
        }
    };

    const onTabSwitch = (indexItem) => {
        const newSumberPa = sumberPa.map((item, index) => ({
            ...item,
            isActive: index === indexItem
        }));
        
        setSumperPa(newSumberPa);
        setSumberPaActiveIndex(indexItem);
        setCurrentPage(1);
        onGetPersonil({ sumberPa: newSumberPa[indexItem].title, page: 1, ...filter });
    };

    const onNextPage = ({ page }) => {
        setCurrentPage(page);
        onGetPersonil({ sumberPa: sumberPa[sumberPaActiveIndex]?.title, page: page, ...filter });
    };

    const onFilter = ({ field, value }) => {
        const newFilter = { ...filter, [field]: value };
        setFilter(newFilter);
        setCurrentPage(1);
        onGetPersonil({ sumberPa: sumberPa[sumberPaActiveIndex]?.title, page: 1, ...newFilter });
    };

    const onShowConfirmDelete = (personil_id) => {
        setElement(
            <ConfirmDeleteModal 
                onClickOutside={() => setElement(false)} 
                onCancel={() => setElement(false)} 
                onSave={() => onDeletePersonil({ personil_id })} 
            />
        );
    };

    const onDeletePersonil = async ({ personil_id = null }) => {
        try {
            await deletePersonilRequest({ personil_id });
            setElement(false);
            onTabSwitch(sumberPaActiveIndex);
        } catch (error) {
            console.error("Error deleting personil:", error);
        }
    };

    useEffect(() => {
        getSumberPa();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setPageState('personil', { filter, page: currentPage, sumberPaActiveIndex });
    }, [filter, currentPage, sumberPaActiveIndex]);

    const contextValue = {
        navigation,
        element,
        personil,
        sumberPa,
        filter,
        onTabSwitch,
        onNextPage,
        onFilter,
        onShowConfirmDelete
    };

    return (
        <PersonilContext.Provider value={contextValue}>
            {children}
        </PersonilContext.Provider>
    );
};

export const UsePersonilContext = () => {
    const context = useContext(PersonilContext);
    if (!context) {
        // Fallback to avoid immediate crash if provider is missing
        return {};
    }
    return context;
};
