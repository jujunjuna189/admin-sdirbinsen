import { useEffect, useRef, useState } from "react";
import { updateJabatanRequest } from "../../../../../api/JabatanRequest";
import { Button, InputText } from "../../../../../components";

const UpdateJabatanModal = (props) => {
    const ref = useRef();
    const [isShow, setIsShow] = useState(false);
    const [controller, setController] = useState({
        nama: props.jabatan.nama,
    });
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
        await updateJabatanRequest({ jabatan_id: props.jabatan.id, body: dataBatch }).then((res) => {
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
            <Button className="border py-[0.2rem] bg-yellow-50 border-yellow-800 text-yellow-800" onClick={() => toogleModal()}>Ubah</Button>
            <div className={`fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center z-10 ${!isShow && "hidden"}`}>
                <div className="absolute w-full h-full bg-black opacity-30 z-10" onClick={() => toogleModal()}></div>
                <div className="p-3 border rounded-lg bg-white w-96 z-10">
                    <div className="leading-3">
                        <span className="text-base font-medium">Ubah Jabatan</span>
                        <br />
                        <small>Silahkan isi form jabatan</small>
                    </div>
                    <div className="flex flex-col gap-1 py-2 my-2">
                        <div>
                            <span className="font-medium">Nama Jabatan</span>
                            <InputText className="mt-1" value={controller.nama} error={errors.nama} onChange={(value) => onSetController("nama", value)} placeholder="..." />
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

export default UpdateJabatanModal;
