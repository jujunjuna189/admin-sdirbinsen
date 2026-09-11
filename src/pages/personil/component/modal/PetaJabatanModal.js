import { useCallback, useEffect, useRef, useState } from "react";
import { getPetaJabatanRequest } from "../../../../api/PetaJabatanRequest";
import { getSatuanPersonilRequest } from "../../../../api/SatuanRequest";
import { EmptyData } from "../../../../components";
import { getLocalUser } from "../../../../utils";

const PetaJabatanModal = (props) => {
    const ref = useRef();
    const satuanRef = useRef();
    const localUserSatuanId = getLocalUser()?.auth?.user?.satuan_id;
    const [isShow, setIsShow] = useState(false);
    const [data, setData] = useState([]);
    const [satuanData, setSatuanData] = useState([]);
    const [satuanId, setSatuanId] = useState("");
    const [satuanName, setSatuanName] = useState("");
    const [satuanKeyword, setSatuanKeyword] = useState("");
    const [isShowSatuan, setIsShowSatuan] = useState(false);
    const [keyword, setKeyword] = useState("");

    const getSatuan = useCallback(async () => {
        const res = await getSatuanPersonilRequest();
        setSatuanData(Array.isArray(res) ? res : []);
    }, []);

    const getPetaJabatan = useCallback(async (search = "") => {
        const selectedSatuanId = localUserSatuanId || satuanId;
        const res = await getPetaJabatanRequest({
            satuan_id: selectedSatuanId,
            search: search
        });
        let value = [];
        Object.keys(res?.data ?? {})?.forEach(item => {
            value.push({
                nama: item,
                items: Array.isArray(res?.data?.[item]) ? res.data[item] : [],
            });
        });
        setData(value);
    }, [localUserSatuanId, satuanId]);

    const toogleModal = () => {
        if (!isShow && !localUserSatuanId) {
            getSatuan();
        }
        setKeyword("");
        setSatuanKeyword("");
        setIsShowSatuan(false);
        setIsShow(!isShow);
    };

    const handleClickOutside = (event) => {
        if (!ref?.current?.contains(event.target)) {
            setIsShow(false);
        }
    };

    const onChange = (index, indexChild) => {
        const item = filteredData[index]?.items[indexChild];
        props.onChange && props.onChange(item);
        setIsShow(false);
    };

    const onChangeSatuan = (item) => {
        setSatuanId(item?.id ?? "");
        setSatuanName(item?.nama ?? "");
        setSatuanKeyword("");
        setIsShowSatuan(false);
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        const handleClickOutsideSatuan = (event) => {
            if (isShowSatuan && !satuanRef?.current?.contains(event.target)) {
                setIsShowSatuan(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutsideSatuan);
        return () => document.removeEventListener("mousedown", handleClickOutsideSatuan);
    }, [isShowSatuan]);

    useEffect(() => {
        if (isShow) {
            const delayDebounceFn = setTimeout(() => {
                getPetaJabatan(keyword);
            }, 500);

            return () => clearTimeout(delayDebounceFn);
        }
    }, [keyword, isShow, getPetaJabatan]);

    /** 🔍 filter data */
    const filteredData = data
        .map(item => {
            const filteredItems = item.items.filter(child =>
                child?.jabatan?.toLowerCase().includes(keyword.toLowerCase()) ||
                child?.personil?.nama?.toLowerCase().includes(keyword.toLowerCase())
            );

            return {
                ...item,
                items: filteredItems,
            };
        })
        .filter(item => item.items.length > 0);

    const filteredSatuanData = satuanData.filter((item) =>
        item.nama?.toLowerCase().includes(satuanKeyword.toLowerCase())
    );

    return (
        <div className="inline-block" ref={ref}>
            <div className="cursor-pointer" onClick={toogleModal}>
                {props.btn ? props.btn : (
                    <>
                        <span className="font-medium text-[12px] text-blue-500">Pilih Dari Peta Jabatan</span>
                    </>
                )}
            </div>

            <div className={`fixed inset-0 flex justify-center items-center z-10 ${!isShow && "hidden"}`}>
                <div className="absolute inset-0 bg-black opacity-30 z-10" onClick={toogleModal}></div>

                <div className="p-3 border rounded-lg bg-white w-[35vw] z-10">
                    <div className="leading-3 mb-2">
                        <span className="text-base font-medium">Pilih Jabatan Dari Peta Jabatan</span><br />
                        <small>Ketik untuk mencari</small>
                    </div>

                    <div className="flex gap-2 mb-2">
                        <input
                            type="text"
                            className="flex-grow border rounded-lg px-3 py-2 focus:outline-none focus:ring"
                            placeholder="Cari jabatan..."
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                        {!localUserSatuanId && (
                            <div className="relative w-56" ref={satuanRef}>
                                <div
                                    className={`border rounded-lg px-3 py-2 cursor-pointer flex justify-between gap-2 ${!satuanName && 'text-slate-400'}`}
                                    onClick={() => setIsShowSatuan(!isShowSatuan)}
                                >
                                    <span className="truncate">{satuanName || "Semua Satuan"}</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 mt-1" width="12" height="12" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                        <path d="M6 9l6 6l6 -6"></path>
                                    </svg>
                                </div>

                                <div className={`absolute right-0 mt-1 w-72 border rounded-lg bg-white z-20 p-2 shadow ${!isShowSatuan && "hidden"}`}>
                                    <input
                                        type="text"
                                        className="w-full border rounded-lg px-3 py-2 mb-2 focus:outline-none focus:ring"
                                        placeholder="Cari satuan..."
                                        value={satuanKeyword}
                                        onChange={(e) => setSatuanKeyword(e.target.value)}
                                        autoFocus
                                    />
                                    <div className="overflow-y-auto max-h-60 flex flex-col gap-1">
                                        <div
                                            className="p-2 border rounded-lg cursor-pointer hover:bg-slate-100"
                                            onClick={() => onChangeSatuan({ id: "", nama: "" })}
                                        >
                                            Semua Satuan
                                        </div>
                                        {filteredSatuanData.map((item) => (
                                            <div
                                                key={item.id}
                                                className="p-2 border rounded-lg cursor-pointer hover:bg-slate-100"
                                                onClick={() => onChangeSatuan(item)}
                                            >
                                                {item.nama}
                                            </div>
                                        ))}

                                        {filteredSatuanData.length === 0 && <EmptyData />}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="overflow-y-auto h-[50vh] flex flex-col gap-1">
                        {filteredData.map((item, index) => (
                            <div key={index} className="space-y-1">
                                <div
                                    className="p-2 border rounded-lg cursor-pointer bg-gray-200 sticky top-0"
                                >
                                    {item.nama}
                                </div>
                                <div className="space-y-1">
                                    {item.items.map((itemChild, indexChild) => (
                                        <div
                                            key={indexChild}
                                            className={`p-2 border rounded-lg cursor-pointer space-y-1 ${itemChild?.personil == null ? 'bg-red-800 hover:bg-red-700 text-white' : 'bg-white hover:bg-slate-100 hover:text-black'}`}
                                            onClick={() => onChange(index, indexChild)}
                                        >
                                            {itemChild.jabatan}
                                            <hr className="border-slate-300" />
                                            <table className="text-[12px]">
                                                <tbody>
                                                    <tr>
                                                        <td><span className="text-gray-400">Nama Lengkap </span></td>
                                                        <td><span className="">: {itemChild?.personil?.nama ?? '-'}</span></td>
                                                    </tr>
                                                    <tr>
                                                        <td><span className="text-gray-400">Satuan Personel </span></td>
                                                        <td><span className="">: {itemChild?.personil?.satuan?.nama ?? '-'}</span></td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}

                        {filteredData.length === 0 && <EmptyData />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PetaJabatanModal;
