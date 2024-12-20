import { useEffect, useRef, useState } from "react";
import { deleteReferensiRequest } from "../../../../api/ReferensiRequest";

const FolderMenusPopup = (props) => {
    const ref = useRef();
    const [isShow, setIsShow] = useState(false);

    const handleClickOutside = (event) => {
        if (!ref?.current?.contains(event.target)) {
            setIsShow(false);
        }
    };

    const onDelete = async () => {
        await deleteReferensiRequest({ referensi_id: props.data.id }).then((res) => {
            props.onDelete && props.onDelete();
        });
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={ref} onClick={() => setIsShow(!isShow)}>
            <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /><path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" /></svg>
            </span>
            {isShow && (
                <div className="absolute top-5 left-2">
                    <div className="bg-white border rounded-md shadow-all">
                        <ul>
                            {/* <li className="px-8 py-2 font-medium border-b text-[12px]" onClick={() => console.log("oke")}>
                                Ubah
                            </li> */}
                            {props.data.link && (
                                <li className="px-8 py-2 font-medium border-b text-[12px] whitespace-pre" onClick={() => window.open(props.data.link)}>
                                    Lihat Link
                                </li>
                            )}
                            <li className="px-8 py-2 font-medium border-b text-[12px] whitespace-pre" onClick={() => onDelete()}>
                                Hapus
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FolderMenusPopup;