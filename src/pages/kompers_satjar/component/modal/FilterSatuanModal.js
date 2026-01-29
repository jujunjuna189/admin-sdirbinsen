import { useEffect, useRef, useState } from "react";
import { getSatuanPersonilRequest } from "../../../../api/SatuanRequest";
import { EmptyData } from "../../../../components";

const FilterSatuanModal = (props) => {
    const ref = useRef();
    const [isShow, setIsShow] = useState(false);
    const [data, setData] = useState([]);
    const [keyword, setKeyword] = useState("");

    const getSatuan = async () => {
        const res = await getSatuanPersonilRequest();
        setData([
            { id: null, nama: "Semua" },
            ...res
        ]);
    };

    const toogleModal = () => {
        getSatuan();
        setKeyword("");
        setIsShow(!isShow);
    };

    const handleClickOutside = (event) => {
        if (!ref?.current?.contains(event.target)) {
            setIsShow(false);
        }
    };

    const onChange = (item) => {
        props.onChange && props.onChange(item);
        setIsShow(false);
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredData = data.filter((item) =>
        item.nama?.toLowerCase().includes(keyword.toLowerCase())
    );

    return (
        <div className="inline-block" ref={ref}>
            <div className="cursor-pointer" onClick={toogleModal}>
                {props.btn}
            </div>

            <div className={`fixed inset-0 flex justify-center items-center z-10 ${!isShow && "hidden"}`}>
                <div className="absolute inset-0 bg-black opacity-30 z-10" onClick={toogleModal}></div>

                <div className="p-3 border rounded-lg bg-white w-96 z-10">
                    <div className="leading-3 mb-2">
                        <span className="text-base font-medium">Pilih Satuan</span><br />
                        <small>Ketik untuk mencari</small>
                    </div>

                    <input
                        type="text"
                        className="w-full border rounded-lg px-3 py-2 mb-2 focus:outline-none focus:ring border-slate-200 text-sm"
                        placeholder="Cari satuan..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />

                    <div className="overflow-y-auto h-[25vh] flex flex-col gap-1">
                        {filteredData.map((item, index) => (
                            <div
                                key={index}
                                className="p-2 border rounded-lg cursor-pointer hover:bg-slate-100 text-sm"
                                onClick={() => onChange(item)}
                            >
                                {item.nama}
                            </div>
                        ))}

                        {filteredData.length === 0 && <EmptyData />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterSatuanModal;
