import { useEffect, useRef, useState } from "react";
import { Button } from "../../../../components";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { updateSatuanRequest } from "../../../../api/SatuanRequest";

const UpdateMarsSatuanModal = (props) => {
    const ref = useRef();
    const [isShow, setIsShow] = useState(false);
    const [value, setValue] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [errors, setErrors] = useState({});

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ size: [] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
            ],
            ["link", "image", "video"]
        ]
    }

    const toogleModal = () => {
        setIsShow(!isShow);
    };

    const handleClickOutside = (event) => {
        if (!ref?.current?.contains(event.target)) {
            setIsShow(false);
        }
    };

    const onSave = async () => {
        let dataBatch = { ...props.satuan };
        dataBatch.satuan_id = props.satuan.id;
        dataBatch.mars = value;
        delete dataBatch.logo;
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
        setValue(props.satuan.mars);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="inline-block" ref={ref}>
            <div className="cursor-pointer" onClick={() => toogleModal()}>
                <div className="flex gap-3 items-center text-slate-600">
                    <Button className="border border-yellow-700 bg-yellow-50 text-yellow-700 flex justify-center py-[0.35rem]">Ubah</Button>
                </div>
            </div>
            <div className={`fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center z-10 ${!isShow && "hidden"}`}>
                <div className="absolute w-full h-full bg-black opacity-30 z-10" onClick={() => toogleModal()}></div>
                <div className="p-3 border bg-white w-full h-full z-10 overflow-y-auto">
                    <div className="flex justify-between items-center">
                        <div className="leading-3">
                            <span className="text-base font-medium">Ubah Lirik Mars</span>
                            <br />
                            <small>Buat atau lengkapi Lirik Mars satuan</small>
                        </div>
                        <div className="flex justify-end gap-3 mt-3">
                            <Button className="border border-slate-700 text-slate-700" onClick={() => toogleModal()}>
                                Batal
                            </Button>
                            <Button className="bg-slate-700 text-white" onClick={() => onSave()}>
                                Simpan
                            </Button>
                        </div>
                    </div>
                    <div className="gap-1 py-2 my-2">
                        <ReactQuill className="h-[75vh]" modules={modules} theme="snow" value={value ?? props.satuan.sejarah} onChange={setValue} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateMarsSatuanModal;
