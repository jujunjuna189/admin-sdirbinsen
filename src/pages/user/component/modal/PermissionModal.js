import { useEffect, useRef, useState } from "react";
import { getPermissionRequest } from "../../../../api/PermissionRequest";
import { updateUserPermissionRequest } from "../../../../api/UserPermissionRequest";
import { Button, InputChecked } from "../../../../components";

const PermissionModal = (props) => {
    const ref = useRef();
    const [isShow, setIsShow] = useState(false);
    const [permission, setPermission] = useState({});
    const [controller, setController] = useState({});

    const toogleModal = () => {
        setIsShow(!isShow);
        getPermission();
    };

    const handleClickOutside = (event) => {
        if (!ref?.current?.contains(event.target)) {
            setIsShow(false);
        }
    };

    const onSetController = (field, value) => {
        setController({ ...controller, [field]: value });
    }

    const onCheckedPermission = (itemParent, itemIndexChild, value) => {
        const permission_data = permission[itemParent][itemIndexChild];
        let dataBatch = controller.permission ?? {};
        if (value) {
            dataBatch = { ...dataBatch, [permission_data.original_data.id]: true };
        } else {
            delete dataBatch[permission_data.original_data.id];
        }

        onSetController('permission', dataBatch);
    }

    const setSettingPermission = () => {
        let dataBatch = {};
        props?.permissions?.forEach((item, index) => {
            dataBatch = { ...dataBatch, [item.id]: true };
        });

        onSetController('permission', dataBatch);
    }

    const getPermission = async () => {
        await getPermissionRequest().then((res) => {
            setPermission(res);
            setSettingPermission();
        });
    }

    const onSave = async () => {
        let dataBatch = { ...controller };
        dataBatch.user_id = props.user?.id;
        dataBatch.permission_id = Object.keys(dataBatch.permission ?? {});
        await updateUserPermissionRequest({ user_id: props.user?.id, body: dataBatch }).then((res) => {
            if (!res?.errors) {
                setController({});
                toogleModal();
                props.onSave && props.onSave();
            }
        });
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="inline-block" ref={ref}>
            <div className="cursor-pointer" onClick={() => toogleModal()}>
                <div className="flex gap-3 items-center text-slate-600">
                    <Button className="border border-yellow-700 bg-yellow-50 text-yellow-700 flex justify-center py-[0.4rem]">Ubah</Button>
                </div>
            </div>
            <div className={`fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center z-10 ${!isShow && "hidden"}`}>
                <div className="absolute w-full h-full bg-black opacity-30 z-10" onClick={() => toogleModal()}></div>
                <div className="p-3 border rounded-lg bg-white w-96 z-10">
                    <div className="leading-3">
                        <span className="text-base font-medium">Tambah Hak Akses</span>
                        <br />
                        <small>Silahkan isi Hak Akses yang sesuai</small>
                    </div>
                    <div className="min-h-[25vh] max-h-[80vh] flex flex-col gap-1 py-2 my-2 overflow-y-auto">
                        <div className="flex flex-col gap-2">
                            {Object.keys(permission)?.map((item, index) => {
                                return (
                                    <div key={index}>
                                        <div className="mb-1">
                                            <span className="font-semibold">{item}</span>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            {permission[item].map((itemChild, indexChild) => {
                                                return (
                                                    <div key={indexChild} className="border rounded-lg py-2 px-3 flex items-center gap-2">
                                                        <InputChecked checked={controller.permission?.[itemChild.original_data.id] ?? false} onChange={(value) => onCheckedPermission(item, indexChild, value)} />
                                                        <span>{itemChild.original_data.display}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
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

export default PermissionModal;
