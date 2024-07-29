import { useEffect, useState } from "react";
import { getPersonilRequest } from "../../../../api/PersonilRequest";
import { Button, EmptyData, InputText } from "../../../../components";

const AddUserPersonilModal = (props) => {
    const [personil, setPersonil] = useState({});
    const [controller, setController] = useState({});
    const [errors] = useState({});

    const onGetPersonil = async () => {
        setPersonil({});
        await getPersonilRequest({}).then((res) => {
            res === undefined && (res = {});
            res === null && (res = {});
            setPersonil(res);
        });
    }

    const onClickOutside = () => {
        props.onClickOutside && props.onClickOutside();
    }

    const onSetController = (field, value) => {
        setController({ ...controller, [field]: value });
    }

    const onSave = async () => {
        // let dataBatch = { ...controller };
        // await createRoleRequest({ body: dataBatch }).then((res) => {
        //     res?.errors && setErrors(res?.errors);
        //     if (!res?.errors) {
        //         setController({});
        //         setErrors({});
        //         props.onSave && props.onSave();
        //     }
        // });
    }

    useEffect(() => {
        onGetPersonil();
    }, []);

    return (
        <div className="fixed bottom-0 top-0 left-0 right-0 flex justify-center items-center z-10">
            <div className="absolute h-full w-full bg-black opacity-30" onClick={() => onClickOutside()} />
            <div className="p-3 border rounded-lg bg-white w-96 z-10">
                <div className="leading-3">
                    <span className="text-base font-medium">Hubungkan dengan profil personel</span><br />
                </div>
                <div className="flex flex-col gap-1 py-2 my-2">
                    <div>
                        <span className="font-medium">Judul Hak Akses</span>
                        <InputText className="mt-1" value={controller.name} error={errors.name} onChange={(value) => onSetController('name', value)} placeholder="Nama Personil" />
                    </div>
                    <div className="h-[358px] max-h-[358px] overflow-y-auto">
                        {personil.data?.length === 0 && <EmptyData />}
                        {personil.data?.map((item, index) => {
                            return (
                                <div key={index}>
                                    {item.name}
                                </div>
                            );
                        })}
                    </div>
                    <div className="flex-grow" />
                    <div className="flex justify-end mt-3"><Button className="bg-slate-700 text-white" onClick={() => onSave()}>Simpan</Button></div>
                </div>
            </div>
        </div>
    );
}

export default AddUserPersonilModal;