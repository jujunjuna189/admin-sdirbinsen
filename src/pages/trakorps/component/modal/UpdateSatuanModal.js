import { useEffect, useRef, useState } from "react";
import { updateSatuanRequest } from "../../../../api/SatuanRequest";
import { Button, ErrorPopup, InputArea, InputFile, InputNumber, InputText, LoaderPopup, SuccessPopup } from "../../../../components";

const UpdateSatuanModal = (props) => {
    const ref = useRef();
    const [isShow, setIsShow] = useState(false);
    const [element, setElement] = useState(false);
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
    }

    const onSave = async () => {
        setElement(<LoaderPopup />);
        let dataBatch = { ...controller };
        dataBatch.logo = dataBatch.picture?.file ?? null;
        delete dataBatch.sejarah;
        delete dataBatch.mars_lagu;
        delete dataBatch.hymne_lagu;
        await updateSatuanRequest({ satuan_id: props.satuan.id, body: dataBatch }).then((res) => {
            res?.errors && setErrors(res?.errors);
            res?.errors && setElement(<ErrorPopup />);
            !res?.errors && setElement(<SuccessPopup />);
            setTimeout(() => { setElement(false); setIsShow(false); props.onSave && props.onSave() }, 1000);
        });
    }

    useEffect(() => {
        setController({ picture: { preview: props.satuan?.logo }, ...(props.satuan) });
    }, [props.satuan]);

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="inline-block" ref={ref}>
                <Button className="border py-[0.2rem] bg-yellow-50 border-yellow-800 text-yellow-800" onClick={() => toogleModal()}>
                    Ubah Satuan
                </Button>
                <div className={`fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center z-10 ${!isShow && 'hidden'}`}>
                    <div className="absolute h-full w-full bg-black opacity-30 z-10" onClick={() => toogleModal()}></div>
                    <div className="p-3 border rounded-lg bg-white z-10">
                        <div className="mt-5 flex flex-col gap-3">
                            <div className="border rounded-lg p-3 w-[652px]">
                                <span className="text-base font-medium">Tambah Satuan</span>
                                <div className="flex flex-col gap-3 mt-3">
                                    <div className="flex gap-5 items-center">
                                        <div>
                                            <div className="w-32 h-32 bg-slate-100 flex justify-center items-center relative">
                                                {controller?.picture?.preview && (<div className="w-full h-full absolute bg-slate-100">
                                                    <img src={controller?.picture?.preview} alt="ImageProfile" className="object-cover w-full h-full" />
                                                </div>)}
                                                <div className="flex flex-col gap-1 text-center text-slate-300">
                                                    <div className="flex justify-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                                                            <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                                                            <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855"></path>
                                                        </svg>
                                                    </div>
                                                    <span className="font-medium">Logo</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grow">
                                            <div className="mb-2">
                                                <span className="font-medium">Unggah Logo</span><br />
                                                <small>Sertakan logo satuan dengan mengunggah logo...</small>
                                            </div>
                                            <div className="flex">
                                                <InputFile error={errors.logo} onChange={(value) => onSetController('picture', value)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <span className="font-medium">Nama Satuan</span>
                                        <InputText className="mt-1" value={controller.nama} error={errors.nama} onChange={(value) => onSetController('nama', value)} placeholder="..." />
                                    </div>
                                    <div>
                                        <span className="font-medium">Urutan Satuan</span>
                                        <InputNumber className="mt-1" value={controller.order_number} error={errors.order_number} onChange={(value) => onSetController('order_number', value)} placeholder="..." />
                                    </div>
                                    <div>
                                        <span className="font-medium">Alamat</span>
                                        <InputArea className="mt-1" value={controller.alamat} error={errors.alamat} onChange={(value) => onSetController('alamat', value)} placeholder="..." />
                                    </div>
                                    <div className="flex justify-end mt-8 mb-3 gap-2">
                                        <Button className="bg-slate-700 text-white" onClick={() => onSave()}>Simpan</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {element}
        </>
    );
}

export default UpdateSatuanModal;