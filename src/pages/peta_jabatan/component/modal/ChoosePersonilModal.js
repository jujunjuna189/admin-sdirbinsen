import { useEffect, useRef, useState } from "react";
import { getPersonilRequest } from "../../../../api/PersonilRequest";
import { EmptyData, InputSearch, InputSelect } from "../../../../components";

const ChoosePersonilModal = (props) => {
    const ref = useRef();
    const [isShow, setIsShow] = useState(false);
    const [data, setData] = useState([]);

    const getPersonil = async () => {
        await getPersonilRequest({}).then((res) => {
            setData(res.data);
        });
    }

    const toogleModal = () => {
        getPersonil();
        setIsShow(!isShow);
    }

    const handleClickOutside = (event) => {
        if (!ref?.current?.contains(event.target)) {
            setIsShow(false);
        }
    };

    const onChange = (itemIndex) => {
        if (itemIndex >= 0) {
            const item = data[itemIndex];
            props.onChange && props.onChange(item);
        } else {
            props.onChange && props.onChange(null);
        }
        setIsShow(false);
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="" ref={ref}>
            <div className="cursor-pointer" onClick={() => toogleModal()}>
                <span className="font-medium">Personil</span>
                <InputSelect className="mt-1" error={props.error} placeholder={props.value ?? 'Pilih Personil...'} />
            </div>
            <div className={`fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center z-10 ${!isShow && 'hidden'}`}>
                <div className="absolute h-full w-full bg-black opacity-30 z-10" onClick={() => toogleModal()}></div>
                <div className="p-3 border rounded-lg bg-white w-96 z-10">
                    <div className="leading-3">
                        <span className="text-base font-medium">Pilih Personil</span><br />
                        <small>Klik item jika akan memilih</small>
                    </div>
                    <div className="mt-5 mb-2">
                        <InputSearch className="shadow-none" placeholder="Cari..." />
                    </div>
                    <div className="overflow-y-auto h-[25vh] flex flex-col gap-1 py-2 my-2">
                        <div className="p-2 border rounded-lg cursor-pointer hover:bg-slate-100" onClick={() => onChange(-1)}>
                            Kosongkan Jabatan
                        </div>
                        {data.map((item, index) => {
                            return (
                                <div className="p-2 border rounded-lg cursor-pointer hover:bg-slate-100" key={index} onClick={() => onChange(index)}>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>Nama </td>
                                                <td>: {item.nama}</td>
                                            </tr>
                                            <tr>
                                                <td>NRP </td>
                                                <td>: {item.nama}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            );
                        })}
                        {data.length === 0 && <EmptyData />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChoosePersonilModal;