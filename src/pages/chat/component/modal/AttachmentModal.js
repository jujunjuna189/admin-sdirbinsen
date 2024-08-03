import { useEffect, useRef, useState } from "react";
import { InputText } from "../../../../components";

const AttachmentModal = (props) => {
    const ref = useRef();
    const [isShow, setIsShow] = useState(false);
    const [isShowV2, setIsShowV2] = useState(false);
    // eslint-disable-next-line no-unused-vars
    const [controller, setController] = useState([]);
    const [currentController, setCurrentController] = useState({});

    const handleClickOutside = (event) => {
        if (!ref?.current?.contains(event.target)) {
            setIsShow(false);
        }
    };

    const toogleModal = () => {
        setIsShow(!isShow);
    };

    const handleInputChange = (event, index) => {
        // Show modal 2
        setIsShowV2(true);
        // set data
        const file = event.target.files[0];
        setController([{ index: index, attachment: file, message: "" }]);
        setCurrentController({ index: index, attachment: file, message: "" });
    }

    const onSetController = (field, value) => {
        setCurrentController({ ...currentController, [field]: value });
        // set to array controller
        let controllerIndex = controller.findIndex((item) => item.index === currentController.index);
        controller[controllerIndex][field] = value;
        setController([...controller]);
    };

    const onSend = () => {
        setIsShowV2(false);
        props.onSend && props.onSend(controller);
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
    }, []);


    return (
        <div>
            <div className="relative" ref={ref}>
                <div className="ml-2 px-2 border-r cursor-pointer" onClick={() => toogleModal()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" className="text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 9l5 -5l5 5" /><path d="M12 4l0 12" /></svg>
                </div>
                <div className={`absolute -top-16 w-56 rounded-lg bg-white p-1 border shadow-sm cursor-pointer ${!isShow && "hidden"}`}>
                    <div className="flex gap-2 items-center p-2 rounded-lg hover:bg-slate-100 cursor-pointer">
                        <input type="file" accept=".xlsx,.csv,.ppt,.pptx,.png,.jpg,.jpeg,.pdf" className="absolute left-0 top-0 right-0 bottom-0 border opacity-0 cursor-pointer w-full" onChange={(event) => handleInputChange(event, 0)} />
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15 3v4a1 1 0 0 0 1 1h4" /><path d="M18 17h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h4l5 5v7a2 2 0 0 1 -2 2z" /><path d="M16 17v2a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h2" /></svg>
                        </div>
                        <small className="text-slate-700 font-medium">Dokumen</small>
                    </div>
                </div>
            </div>
            <div className={`absolute top-0 left-0 bottom-0 right-0 bg-slate-50 border rounded-lg flex flex-col ${!isShowV2 && 'hidden'}`}>
                <div className="flex items-center p-2">
                    <div className="p-2 cursor-pointer" onClick={() => setIsShowV2(!isShowV2)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>
                    </div>
                    <div className="grow flex justify-center">
                        <span className="font-medium">{currentController?.attachment?.name}</span>
                    </div>
                    <div className="px-8 cursor-pointer"></div>
                </div>
                <div className="grow flex justify-center items-center">
                    <div className="bg-slate-50 px-24 py-10 border rounded-lg">
                        <div className="mb-5 flex justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" className="text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" /></svg>
                        </div>
                        <div className="flex flex-col text-center">
                            <span className="text-base font-medium text-slate-400">Pratinjau tidak tersedia</span>
                            <div className="leading-4">
                                <div className="text-slate-400 flex gap-2 justify-center">
                                    <span>{currentController?.attachment?.size} Bytes</span>
                                </div>
                                <div className="text-slate-400">
                                    <small>{currentController?.attachment?.type}</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center px-4 pb-8">
                    <div className="w-[50rem]">
                        <div className="border flex rounded-lg items-center">
                            <InputText className="border-none" value={currentController?.message} onChange={(value) => onSetController("message", value)} placeholder="Tambah Keterangan" />
                            <div className="mr-2 px-2 border-l cursor-pointer" onClick={() => onSend()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4.698 4.034l16.302 7.966l-16.302 7.966a.503 .503 0 0 1 -.546 -.124a.555 .555 0 0 1 -.12 -.568l2.468 -7.274l-2.468 -7.274a.555 .555 0 0 1 .12 -.568a.503 .503 0 0 1 .546 -.124z" /><path d="M6.5 12h14.5" /></svg>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="h-12"></div>
            </div>
        </div>
    );
}

export default AttachmentModal;