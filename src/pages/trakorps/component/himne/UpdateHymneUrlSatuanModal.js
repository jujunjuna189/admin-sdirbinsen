import { useEffect, useRef, useState } from "react";
import { updateSatuanRequest } from "../../../../api/SatuanRequest";
import { Button, InputFileMusic } from "../../../../components";

const UpdateHymneUrlSatuanModal = (props) => {
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
        let dataBatch = { ...props.satuan };
        dataBatch.satuan_id = props.satuan.id;
        dataBatch.hymne_lagu = controller.file;
        delete dataBatch.logo;
        delete dataBatch.sejarah;
        await updateSatuanRequest({ satuan_id: props.satuan.id, body: dataBatch }).then((res) => {
            res?.errors && setErrors(res?.errors);
            if (!res?.errors) {
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
                    <Button className="border border-yellow-700 bg-yellow-50 text-yellow-700 flex justify-center py-[0.35rem] whitespace-pre">Ubah Lagu</Button>
                </div>
            </div>
            <div className={`fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center z-10 ${!isShow && "hidden"}`}>
                <div className="absolute w-full h-full bg-black opacity-30 z-10" onClick={() => toogleModal()}></div>
                <div className="p-3 border rounded-lg bg-white w-96 z-10">
                    <div className="leading-3">
                        <span className="text-base font-medium">Ubah Lagu Hymne</span>
                    </div>
                    <div className="flex flex-col gap-1 py-2 my-2">
                        <div className="flex justify-start">
                            <table>
                                <tbody>
                                    <tr>
                                        <th className="whitespace-pre flex justify-start items-start">Nama File : </th>
                                        <td>{controller.file?.name ?? "Belum ada file yang diunggah"}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="flex justify-center my-2">
                            <InputFileMusic error={errors.picture} onChange={(value) => onSetController('file', value)} />
                        </div>
                        <div className="flex justify-center mt-1">
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

export default UpdateHymneUrlSatuanModal;
