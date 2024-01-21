import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteJabatanRequest, getJabatanByPersonilRequest } from "../../api/JabatanRequest";
import { getKeluargaByPersonilRequest } from "../../api/KeluargaRequest";
import { getKemampuanBahasaByPersonilRequest } from "../../api/KemampuanBahasaRequest";
import { deletePangkatRequest, getPangkatByPersonilRequest } from "../../api/PangkatRequest";
import { getPendidikanMiliterByPersonilRequest } from "../../api/PendidikanMiliterRequest";
import { getPendidikanUmumByPersonilRequest } from "../../api/PendidikanUmumRequest";
import { deletePenugasanLuarNegeriRequest, getPenugasanLuarNegeriByPersonilRequest } from "../../api/PenugasanLuarNegeriRequest";
import { deletePenugasanOperasiRequest, getPenugasanOperasiByPersonilRequest } from "../../api/PenugasanOperasiRequest";
import { getPersonilDetailRequest } from "../../api/PersonilRequest";
import { getTandaJasaByPersonilRequest } from "../../api/TandaJasaRequest";
import { ConfirmDeleteModal } from "../../components";
import { BiodataPersonilDetail, JabatanPersonilDetail, KeluargaPersonilDetail, KemampuanBahasaPersonilDetail, KepangkatanPersonilDetail, PendidikanMiliterPersonilDetail, PendidikanUmumPersonilDetail, PenugasanLuarNegeriPersonilDetail, PenugasanOperasiPersonilDetail, TandaJasaPersonilDetail } from "../../pages/personil/component";

const PersonilDetailContext = createContext();

export const PersonilDetailContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const param = useParams();
    const [element, setElement] = useState(false);
    const [personil, setPersonil] = useState({});
    const [jabatan, setJabatan] = useState({});
    const [pangkat, setPangkat] = useState({});
    const [penugasanLuarNegeri, setPenugasanLuarNegeri] = useState({});
    const [penugasanOperasi, setPenugasanOperasi] = useState({});
    const [tandaJasa, setTandaJasa] = useState({});
    const [keluarga, setKeluarga] = useState({});
    const [pendidikanUmum, setPendidikanUmum] = useState({});
    const [pendidikanMiliter, setPendidikanMiliter] = useState({});
    const [kemampuanBahasa, setKemampuanBahasa] = useState({});
    const [navProfileActive, setNavProfileActive] = useState({});
    const [navProfile, setNavProfile] = useState([
        {
            title: 'Biodata',
            page: 1,
            on_click: () => onGetPersonilDetail({ id: param.id }),
            is_active: true,
        },
        {
            title: 'Jabatan',
            page: 2,
            on_click: () => onGetJabatan({ id: param.id }),
            is_active: false,
        },
        {
            title: 'Kepangkatan',
            page: 3,
            on_click: () => onGetPangkat({ id: param.id }),
            is_active: false,
        },
        {
            title: 'Penugasan Luar Negeri',
            page: 4,
            on_click: () => onGetPenugasanLuarNegeri({ id: param.id }),
            is_active: false,
        },
        {
            title: 'Penugasan Operasi',
            page: 5,
            on_click: () => onGetPenugasanOperasi({ id: param.id }),
            is_active: false,
        },
        {
            title: 'Tanda Jasa',
            page: 6,
            on_click: () => onGetTandaJasa({ id: param.id }),
            is_active: false,
        },
        {
            title: 'Keluarga',
            page: 7,
            on_click: () => onGetKeluarga({ id: param.id }),
            is_active: false,
        },
        // {
        //     title: 'Keluarga Anak',
        //     page: 8,
        //     on_click: () => onGetKeluargaAnak(),
        //     is_active: false,
        // },
        {
            title: 'Pendidikan Umum',
            page: 9,
            on_click: () => onGetPendidikanUmum({ id: param.id }),
            is_active: false,
        },
        {
            title: 'Pendidikan Militer',
            page: 10,
            on_click: () => onGetPendidikanMiliter({ id: param.id }),
            is_active: false,
        },
        {
            title: 'Kemampuan Bahasa',
            page: 11,
            on_click: () => onGetKemampuanBahasa({ id: param.id }),
            is_active: false,
        },
    ]);

    const onGetPersonilDetail = async ({ id }) => {
        await getPersonilDetailRequest({ id: id }).then((res) => {
            res === undefined && (res = {});
            res === null && (res = {});
            setPersonil(res);
        });
    }

    const onGetJabatan = async ({ id }) => {
        await getJabatanByPersonilRequest({ personil_id: id }).then((res) => {
            res === undefined && (res = {});
            res === null && (res = {});
            setJabatan(res);
        });
    }

    const onGetPangkat = async ({ id }) => {
        await getPangkatByPersonilRequest({ personil_id: id }).then((res) => {
            res === undefined && (res = {});
            res === null && (res = {});
            setPangkat(res);
        });
    }

    const onGetPenugasanLuarNegeri = async ({ id }) => {
        await getPenugasanLuarNegeriByPersonilRequest({ personil_id: id }).then((res) => {
            res === undefined && (res = {});
            res === null && (res = {});
            setPenugasanLuarNegeri(res);
        });
    }

    const onGetPenugasanOperasi = async ({ id }) => {
        await getPenugasanOperasiByPersonilRequest({ personil_id: id }).then((res) => {
            res === undefined && (res = {});
            res === null && (res = {});
            setPenugasanOperasi(res);
        });
    }

    const onGetTandaJasa = async ({ id }) => {
        await getTandaJasaByPersonilRequest({ personil_id: id }).then((res) => {
            res === undefined && (res = {});
            res === null && (res = {});
            setTandaJasa(res);
        });
    }

    const onGetKeluarga = async ({ id }) => {
        await getKeluargaByPersonilRequest({ personil_id: id }).then((res) => {
            res === undefined && (res = {});
            res === null && (res = {});
            setKeluarga(res);
        });
    }

    // const onGetKeluargaAnak = () => {

    // }

    const onGetPendidikanUmum = async ({ id }) => {
        await getPendidikanUmumByPersonilRequest({ personil_id: id }).then((res) => {
            res === undefined && (res = {});
            res === null && (res = {});
            setPendidikanUmum(res);
        });
    }

    const onGetPendidikanMiliter = async ({ id }) => {
        await getPendidikanMiliterByPersonilRequest({ personil_id: id }).then((res) => {
            res === undefined && (res = {});
            res === null && (res = {});
            setPendidikanMiliter(res);
        });
    }

    const onGetKemampuanBahasa = async ({ id }) => {
        await getKemampuanBahasaByPersonilRequest({ personil_id: id }).then((res) => {
            res === undefined && (res = {});
            res === null && (res = {});
            setKemampuanBahasa(res);
        });
    }

    // Delete
    const onDeleteJabatan = async ({ jabatan_id }) => {
        await deleteJabatanRequest({ personil_id: param.id, jabatan_id: jabatan_id }).then((res) => {
            res === undefined && (res = {});
            res === null && (res = {});
            setElement(false);
            onGetJabatan({ id: param.id });
        });
    }

    const onDeletePangkat = async ({ pangkat_id }) => {
        await deletePangkatRequest({ personil_id: param.id, pangkat_id: pangkat_id }).then((res) => {
            res === undefined && (res = {});
            res === null && (res = {});
            setElement(false);
            onGetPangkat({ id: param.id });
        });
    }

    const onDeletePenugasanLuarNegeri = async ({ penugasan_luar_negeri_id }) => {
        await deletePenugasanLuarNegeriRequest({ personil_id: param.id, penugasan_luar_negeri_id: penugasan_luar_negeri_id }).then((res) => {
            res === undefined && (res = {});
            res === null && (res = {});
            setElement(false);
            setPenugasanLuarNegeri(res);
        });
    }

    const onDeletePenugasanOperasi = async ({ penugasan_operasi_id }) => {
        await deletePenugasanOperasiRequest({ personil_id: param.id, penugasan_operasi_id: penugasan_operasi_id }).then((res) => {
            res === undefined && (res = {});
            res === null && (res = {});
            setElement(false);
            onGetPenugasanOperasi({ id: param.id });
        });
    }

    const onGetContent = (page) => {
        const content = {
            1: <BiodataPersonilDetail navigation={navigation} personil={personil} />,
            2: <JabatanPersonilDetail personil={personil} jabatan_active={personil?.jabatan_sekarang?.id} jabatan={jabatan} onAdd={() => onGetJabatan({ id: param.id })} onShowConfirmDelete={(itemId) => setElement(<ConfirmDeleteModal onClickOutside={() => setElement(false)} onCancel={() => setElement(false)} onSave={() => onDeleteJabatan({ jabatan_id: itemId })} />)} />,
            3: <KepangkatanPersonilDetail personil={personil} pangkat_active={personil?.kepangkatan_sekarang?.id} pangkat={pangkat} onAdd={() => onGetPangkat({ id: param.id })} onShowConfirmDelete={(itemId) => setElement(<ConfirmDeleteModal onClickOutside={() => setElement(false)} onCancel={() => setElement(false)} onSave={() => onDeletePangkat({ pangkat_id: itemId })} />)} />,
            4: <PenugasanLuarNegeriPersonilDetail personil={personil} penugasan={penugasanLuarNegeri} onAdd={() => onGetPenugasanLuarNegeri({ id: param.id })} onShowConfirmDelete={(itemId) => setElement(<ConfirmDeleteModal onClickOutside={() => setElement(false)} onCancel={() => setElement(false)} onSave={() => onDeletePenugasanLuarNegeri({ penugasan_luar_negeri_id: itemId })} />)} />,
            5: <PenugasanOperasiPersonilDetail personil={personil} penugasan={penugasanOperasi} onAdd={() => onGetPenugasanOperasi({ id: param.id })} onShowConfirmDelete={(itemId) => setElement(<ConfirmDeleteModal onClickOutside={() => setElement(false)} onCancel={() => setElement(false)} onSave={() => onDeletePenugasanOperasi({ penugasan_operasi_id: itemId })} />)} />,
            6: <TandaJasaPersonilDetail personil={personil} tanda_jasa={tandaJasa} onAdd={() => onGetTandaJasa({ id: param.id })} onShowConfirmDelete={(itemId) => setElement(<ConfirmDeleteModal onClickOutside={() => setElement(false)} onCancel={() => setElement(false)} onSave={() => console.log(itemId)} />)} />,
            7: <KeluargaPersonilDetail personil={personil} keluarga={keluarga} onAdd={() => onGetKeluarga({ id: param.id })} onShowConfirmDelete={(itemId) => setElement(<ConfirmDeleteModal onClickOutside={() => setElement(false)} onCancel={() => setElement(false)} onSave={() => console.log(itemId)} />)} />,
            // 8: <BiodataPersonilDetail />,
            9: <PendidikanUmumPersonilDetail personil={personil} pendidikan={pendidikanUmum} onAdd={() => onGetPendidikanUmum({ id: param.id })} onShowConfirmDelete={(itemId) => setElement(<ConfirmDeleteModal onClickOutside={() => setElement(false)} onCancel={() => setElement(false)} onSave={() => console.log(itemId)} />)} />,
            10: <PendidikanMiliterPersonilDetail personil={personil} pendidikan={pendidikanMiliter} onAdd={() => onGetPendidikanMiliter({ id: param.id })} onShowConfirmDelete={(itemId) => setElement(<ConfirmDeleteModal onClickOutside={() => setElement(false)} onCancel={() => setElement(false)} onSave={() => console.log(itemId)} />)} />,
            11: <KemampuanBahasaPersonilDetail personil={personil} kemampuan_bahasa={kemampuanBahasa} onAdd={() => onGetKemampuanBahasa({ id: param.id })} onShowConfirmDelete={(itemId) => setElement(<ConfirmDeleteModal onClickOutside={() => setElement(false)} onCancel={() => setElement(false)} onSave={() => console.log(itemId)} />)} />,
        };

        return content[page];
    }

    const onChangeNavProfile = (indexItem) => {
        navProfile.forEach((item, index) => {
            navProfile[index].is_active = false;
        });

        navProfile[indexItem].is_active = true;
        navProfile[indexItem].on_click();
        setNavProfile([...navProfile]);
        setNavProfileActive({ ...navProfile[indexItem] });
    }

    useEffect(() => {
        onChangeNavProfile(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <PersonilDetailContext.Provider value={{ navigation, element, personil, navProfile, navProfileActive, onChangeNavProfile, onGetContent }}>
            {children}
        </PersonilDetailContext.Provider>
    );
}

export const UsePersonilDetailContext = () => {
    return useContext(PersonilDetailContext);
}