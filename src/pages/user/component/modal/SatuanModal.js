import { useEffect, useRef, useState } from "react";
import { getSatuanPersonilRequest } from "../../../../api/SatuanRequest";
import { EmptyData, InputSelect } from "../../../../components";

const SatuanModal = (props) => {
    const ref = useRef();
    const [isShow, setIsShow] = useState(false);
    const [data, setData] = useState([]);

    const getSatuan = async () => {
        await getSatuanPersonilRequest().then((res) => {
            setData(res);
        });
    }

    const toogleModal = () => {
        getSatuan();
        setIsShow(!isShow);
    }

    const handleClickOutside = (event) => {
        if (!ref?.current?.contains(event.target)) {
            setIsShow(false);
        }
    };

    const onChange = (itemIndex) => {
        var item = {};
        if (itemIndex !== -1) {
            item = data[itemIndex];
        } else {
            item = {
                id: null,
                nama: "Semua Satuan",
            };
        }
        props.onChange && props.onChange(item);
        setIsShow(false);
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="inline-block" ref={ref}>
            <div className="cursor-pointer" onClick={() => toogleModal()}>
                <div className="leading-3">
                    <div className="flex gap-1">
                        <span className="font-medium">Satuan</span>
                        <small>(Optional)</small>
                    </div>
                    <small>Pilih salah satu untuk memberikan hak akses satuan</small>
                </div>
                <InputSelect className="mt-1" error={props.error} placeholder={props.value ?? 'Pilih Satuan...'} />
            </div>
            <div className={`fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center z-10 ${!isShow && 'hidden'}`}>
                <div className="absolute h-full w-full bg-black opacity-30 z-10" onClick={() => toogleModal()}></div>
                <div className="p-3 border rounded-lg bg-white w-96 z-10">
                    <div className="leading-3">
                        <span className="text-base font-medium">Pilih Satuan</span><br />
                        <small>Klik item jika akan memilih</small>
                    </div>
                    <div className="overflow-y-auto h-[25vh] flex flex-col gap-1 py-2 my-2">
                        <div className="p-2 border rounded-lg cursor-pointer hover:bg-slate-100" onClick={() => onChange(-1)}>Semua Satuan</div>
                        {data.map((item, index) => {
                            return (
                                <div className="p-2 border rounded-lg cursor-pointer hover:bg-slate-100" key={index} onClick={() => onChange(index)}>{item.nama}</div>
                            );
                        })}
                        {data.length === 0 && <EmptyData />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SatuanModal;