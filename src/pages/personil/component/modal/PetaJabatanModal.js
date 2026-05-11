import { useEffect, useRef, useState } from "react";
import { getPetaJabatanRequest } from "../../../../api/PetaJabatanRequest";
import { getLocalUser } from "../../../../utils/storage/LocalStorage";
import { EmptyData } from "../../../../components";
import { getLocalUser } from "../../../../utils";

const PetaJabatanModal = (props) => {
    const ref = useRef();
    const [isShow, setIsShow] = useState(false);
    const [data, setData] = useState([]);
    const [keyword, setKeyword] = useState("");

    const getSatuan = async (search = "") => {
        const satuan_id = getLocalUser()?.auth?.user?.satuan_id;
        const res = await getPetaJabatanRequest({
            satuan_id: satuan_id,
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
    };

    const toogleModal = () => {
        setKeyword("");
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

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (isShow) {
            const delayDebounceFn = setTimeout(() => {
                getSatuan(keyword);
            }, 500);

            return () => clearTimeout(delayDebounceFn);
        }
    }, [keyword, isShow]);

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

                    {/* 🔍 Input Search */}
                    <input
                        type="text"
                        className="w-full border rounded-lg px-3 py-2 mb-2 focus:outline-none focus:ring"
                        placeholder="Cari satuan..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />

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