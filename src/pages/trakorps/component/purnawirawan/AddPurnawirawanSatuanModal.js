import { useEffect, useRef, useState } from "react";
import { createSatuanPurnawirawanRequest } from "../../../../api/SatuanPurnawirawanRequest";
import { Button, InputDate, InputFile, InputText } from "../../../../components";

const AddPurnawirawanSatuanModal = (props) => {
    const ref = useRef();
    const [isShow, setIsShow] = useState(false);
    const [controller, setController] = useState({});
    const [errors, setErrors] = useState({});

    const toogleModal = () => {
        setIsShow(!isShow);
    };

    const handleClickOutside = (event) => {
        if (!ref?.current?.contains(event.target)) {
            setIsShow(false);
        }
    };

    const onSetController = (field, value) => {
        setController({ ...controller, [field]: value });
    };

    const onSave = async () => {
        let dataBatch = { ...controller };
        dataBatch.satuan_id = props.satuan.id;
        dataBatch.gambar = dataBatch.picture?.file ?? null;
        await createSatuanPurnawirawanRequest({ body: dataBatch }).then((res) => {
            res?.errors && setErrors(res?.errors);
            if (!res?.errors) {
                setController({});
                setErrors({});
                toogleModal();
                props.onSave && props.onSave();
            }
        });
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="inline-block" ref={ref}>
            <div className="cursor-pointer" onClick={() => toogleModal()}>
                <div className="flex gap-3 items-center text-slate-600">
                    <Button className="bg-red-800 text-white flex justify-center py-[0.4rem]">Tambah</Button>
                </div>
            </div>
            <div className={`fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center z-10 ${!isShow && "hidden"}`}>
                <div className="absolute w-full h-full bg-black opacity-30 z-10" onClick={() => toogleModal()}></div>
                <div className="p-3 border rounded-lg bg-white w-96 z-10">
                    <div className="leading-3">
                        <span className="text-base font-medium">Tambah Data purnawirawan</span>
                        <br />
                        <small>Silahkan isi form data purnawirawan</small>
                    </div>
                    <div className="min-h-[25vh] flex flex-col gap-1 py-2 my-2">
                        <div className="flex justify-center">
                            <div className="w-40 h-40 relative">
                                {controller?.picture?.preview && (<div className="w-full h-full absolute bg-slate-100">
                                    <img src={controller?.picture?.preview} alt="ImageProfile" className="object-cover w-full h-full" />
                                </div>)}
                                <div className="flex justify-center items-center h-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="text-slate-300" width="100" height="100" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15 8h.01" /><path d="M6 13l2.644 -2.644a1.21 1.21 0 0 1 1.712 0l3.644 3.644" /><path d="M13 13l1.644 -1.644a1.21 1.21 0 0 1 1.712 0l1.644 1.644" /><path d="M4 8v-2a2 2 0 0 1 2 -2h2" /><path d="M4 16v2a2 2 0 0 0 2 2h2" /><path d="M16 4h2a2 2 0 0 1 2 2v2" /><path d="M16 20h2a2 2 0 0 0 2 -2v-2" /></svg>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center my-4">
                            <InputFile error={errors.picture} onChange={(value) => onSetController('picture', value)} />
                        </div>
                        <div>
                            <span className="font-medium">Nama Pejabat</span>
                            <InputText className="mt-1" value={controller.nama} error={errors.nama} onChange={(value) => onSetController("nama", value)} placeholder="..." />
                        </div>
                        <div className="flex flex-col leading-3 mt-2">
                            <span className="font-medium">Masa Jabatan</span>
                            <hr className="my-1" />
                            <div className="flex items-center gap-2">
                                <div>
                                    <InputDate className="mt-1" value={controller.masa_jabatan_from} error={errors.masa_jabatan_from} onChange={(value) => onSetController("masa_jabatan_from", value)} placeholder="..." />
                                </div>
                                <small>s/d</small>
                                <div>
                                    <InputDate className="mt-1" value={controller.masa_jabatan_to} error={errors.masa_jabatan_to} onChange={(value) => onSetController("masa_jabatan_to", value)} placeholder="..." />
                                </div>
                            </div>
                        </div>
                        <div>
                            <span className="font-medium">Deskripsi</span>
                            <InputText className="mt-1" value={controller.deskripsi} error={errors.deskripsi} onChange={(value) => onSetController("deskripsi", value)} placeholder="..." />
                        </div>
                        <div className="flex-grow" />
                        <div className="flex justify-end mt-3">
                            <Button className="bg-slate-700 text-white" onClick={() => onSave()}>
                                Simpan
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddPurnawirawanSatuanModal;
