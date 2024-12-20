import { useEffect, useRef, useState } from "react";
import { createReferensiRequest } from "../../../../api/ReferensiRequest";
import { Button, InputText } from "../../../../components";

const CreateFolderModal = (props) => {
    const ref = useRef();
    const [isShow, setIsShow] = useState(false);
    const [controller, setController] = useState({});
    const [errors, setErrors] = useState({});

    const toogleModal = () => {
        setIsShow(!isShow);
    }

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
        console.log(props.path);
        dataBatch.path = props.path;
        await createReferensiRequest({ body: dataBatch }).then((res) => {
            res?.errors && setErrors(res?.errors);
            setTimeout(() => {
                !res?.errors && toogleModal();
                !res?.errors && props.onSave();
            }, 1000);
        });
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="" ref={ref}>
            <Button className="text-sm border" onClick={() => toogleModal()}>
                <div className="flex gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 19h-7a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2h4l3 3h7a2 2 0 0 1 2 2v3.5" /><path d="M16 19h6" /><path d="M19 16v6" /></svg>
                    <span>Folder Baru</span>
                </div>
            </Button>
            <div className={`fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center z-10 ${!isShow && 'hidden'}`}>
                <div className="absolute h-full w-full bg-black opacity-30 z-10" onClick={() => toogleModal()}></div>
                <div className="p-3 border rounded-lg bg-white w-96 z-10 pb-5">
                    <div className="leading-3">
                        <span className="text-base font-medium">Folder Baru</span><br />
                    </div>
                    <hr className="my-3" />
                    <div className="">
                        <div>
                            <span className="font-medium">Nama Folder *</span>
                            <InputText className="mt-1" value={controller.title} error={errors.title} onChange={(value) => onSetController("title", value)} placeholder="..." />
                        </div>
                        <div>
                            <div className="flex flex-col">
                                <span className="font-medium">Link</span>
                                <small>Tambahkan link ?</small>
                            </div>
                            <InputText className="mt-1" value={controller.link} error={errors.link} onChange={(value) => onSetController("link", value)} placeholder="..." />
                        </div>
                        <div className="my-2 flex justify-end gap-2 mt-5">
                            <Button className="border border-slate-400" onClick={() => toogleModal()}>
                                Batal
                            </Button>
                            <Button className="bg-slate-700 text-white" onClick={() => onSave()}>
                                Simpan
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateFolderModal;