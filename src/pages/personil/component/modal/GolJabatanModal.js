import { useEffect, useRef, useState } from "react";
import { getGolJabatanPersonilRequest } from "../../../../api/GolJabatanRequest";
import { EmptyData, InputSelect } from "../../../../components";

const GolJabatanModal = (props) => {
    const ref = useRef();
    const [isShow, setIsShow] = useState(false);
    const [data, setData] = useState([]);

    const getGolJabatan = async () => {
        await getGolJabatanPersonilRequest({}).then((res) => {
            setData(res);
        });
    }

    const toogleModal = () => {
        getGolJabatan();
        setIsShow(!isShow);
    }

    const handleClickOutside = (event) => {
        if (!ref?.current?.contains(event.target)) {
            setIsShow(false);
        }
    };

    const onChange = (itemIndex) => {
        const item = data[itemIndex];
        props.onChange && props.onChange(item);
        setIsShow(false);
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="" ref={ref}>
            <div className="cursor-pointer" onClick={() => toogleModal()}>
                <span className="font-medium">Golongan Jabatan</span>
                <InputSelect className="mt-1" error={props.error} placeholder={props.value ?? 'Pilih Golongan Jabatan...'} />
            </div>
            <div className={`fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center z-10 ${!isShow && 'hidden'}`}>
                <div className="absolute h-full w-full bg-black opacity-30 z-10" onClick={() => toogleModal()}></div>
                <div className="p-3 border rounded-lg bg-white w-96 z-10">
                    <div className="leading-3">
                        <span className="text-base font-medium">Pilih Golongan Jabatan</span><br />
                        <small>Klik item jika akan memilih</small>
                    </div>
                    <div className="overflow-y-auto h-[25vh] flex flex-col gap-1 py-2 my-2">
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

export default GolJabatanModal;