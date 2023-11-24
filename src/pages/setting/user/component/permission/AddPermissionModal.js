import { useState } from "react";
import { createPermissionRequest } from "../../../../../api/PermissionRequest";
import { Button, InputText } from "../../../../../components";

const AddPermissionModal = (props) => {
    const [controller, setController] = useState({});
    const [errors, setErrors] = useState({});

    const onClickOutside = () => {
        props.onClickOutside && props.onClickOutside();
    }

    const onSetController = (field, value) => {
        setController({ ...controller, [field]: value });
    }

    const onSave = async () => {
        let dataBatch = { ...controller };
        await createPermissionRequest({ body: dataBatch }).then((res) => {
            res?.errors && setErrors(res?.errors);
            if (!res?.errors) {
                setController({});
                setErrors({});
                props.onSave && props.onSave();
            }
        });
    }

    return (
        <div className="fixed bottom-0 top-0 left-0 right-0 flex justify-center items-center z-10">
            <div className="absolute h-full w-full bg-black opacity-30" onClick={() => onClickOutside()} />
            <div className="p-3 border rounded-lg bg-white w-96 z-10">
                <div className="leading-3">
                    <span className="text-base font-medium">Tambah Akses Perizinan</span><br />
                    <small>Untuk fitur developer</small>
                </div>
                <div className="flex flex-col gap-1 py-2 my-2">
                    <div>
                        <span className="font-medium">Judul Perizinan</span>
                        <InputText className="mt-1" value={controller.display} error={errors.display} onChange={(value) => onSetController('display', value)} placeholder="Tambah Anggota" />
                    </div>
                    <div>
                        <span className="font-medium">Kata Kunci</span>
                        <InputText className="mt-1" value={controller.key} error={errors.key} onChange={(value) => onSetController('key', value)} placeholder="anggota.create" />
                    </div>
                    <div className="flex-grow" />
                    <div className="flex justify-end mt-3"><Button className="bg-slate-700 text-white" onClick={() => onSave()}>Simpan</Button></div>
                </div>
            </div>
        </div>
    );
}

export default AddPermissionModal;