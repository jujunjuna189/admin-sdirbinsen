import { useEffect, useRef, useState } from "react";
import { getSatuanPurnawirawanDetailRequest, updateSatuanPurnawirawanRequest } from "../../../../api/SatuanPurnawirawanRequest";
import { Button, InputArea, InputDate, InputFile, InputNumber, InputText } from "../../../../components";
import { AgamaModal } from "../../../personil/component";

const UpdatePurnawirawanSatuanModal = (props) => {
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

    const onGetSatuanPurnawirawan = async () => {
        await getSatuanPurnawirawanDetailRequest({ id: props.item.id }).then((res) => {
            setController({
                picture: { preview: res.gambar },
                nama: res.nama,
                tempat_lahir: res.tempat_lahir,
                tanggal_lahir: res.tanggal_lahir,
                agama: res.agama,
                suku_bangsa: res.suku_bangsa,
                pangkat: res.pangkat,
                jabatan: res.jabatan,
                date_from: res.date_from,
                date_to: res.date_to,
                leting: res.leting?.split('-')?.[0] ?? '-',
                leting_tahun: res.leting?.split('-')?.[1] ?? '-',
                no_hp: res.no_hp,
                alamat: res.alamat,
                deskripsi: res.deskripsi,
            });
        });
    }

    const onSave = async () => {
        let dataBatch = { ...controller };
        dataBatch.satuan_id = props.satuan.id;
        dataBatch.gambar = dataBatch.picture?.file ?? null;
        dataBatch.leting && (dataBatch.leting = `${dataBatch.leting ?? '-'}`);
        dataBatch.leting_tahun && (dataBatch.leting += `-${dataBatch.leting_tahun}`);
        await updateSatuanPurnawirawanRequest({ id: props.item.id, body: dataBatch }).then((res) => {
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
            <div className="cursor-pointer" onClick={() => {
                toogleModal();
                onGetSatuanPurnawirawan();
            }}>
                <div className="flex gap-3 items-center text-slate-600">
                    <Button className="border border-yellow-700 bg-yellow-50 text-yellow-700 flex justify-center py-[0.35rem]">Ubah</Button>
                </div>
            </div>
            <div className={`fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center z-10 ${!isShow && "hidden"}`}>
                <div className="absolute w-full h-full bg-black opacity-30 z-10" onClick={() => toogleModal()}></div>
                <div className="p-3 border rounded-lg bg-white w-[652px] max-h-screen overflow-y-auto z-10">
                    <div className="leading-3">
                        <span className="text-base font-medium">Ubah Data Pejabat Dansat</span>
                        <br />
                        <small>Formulir perbaruan data pejabat dansat</small>
                    </div>
                    <div className="min-h-[25vh] flex flex-col gap-1 py-2 my-2">
                        <div className="flex justify-center">
                            <div className="w-40 h-40 relative">
                                {controller?.picture?.preview && (<div className="w-full h-full absolute bg-slate-100">
                                    <img src={controller?.picture?.preview} alt="ImageProfile" className="object-cover w-full h-full" />
                                </div>)}
                                <div className="flex justify-center items-center h-full">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="text-slate-300" width="100" height="100" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15 8h.01" /><path d="M6 13l2.644 -2.644a1.21 1.21 0 0 1 1.712 0l3.644 3.644" /><path d="M13 13l1.644 -1.644a1.21 1.21 0 0 1 1.712 0l1.644 1.644" /><path d="M4 8v-2a2 2 0 0 1 2 -2h2" /><path d="M4 16v2a2 2 0 0 0 2 2h2" /><path d="M16 4h2a2 2 0 0 1 2 2v2" /><path d="M16 20h2a2 2 0 0 0 2 -2v-2" /></svg>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center my-4">
                            <InputFile error={errors.picture} onChange={(value) => onSetController('picture', value)} />
                        </div>
                        <div>
                            <span className="font-medium">Nama Lengkap</span>
                            <InputText className="mt-1" value={controller.nama} error={errors.nama} onChange={(value) => onSetController("nama", value)} placeholder="..." />
                        </div>
                        <div className="flex flex-col leading-3 mt-2">
                            <div className="flex gap-3">
                                <span className="font-medium">Tempat, Tanggal Lahir</span>
                            </div>
                            <hr className="my-1" />
                            <div className="flex items-center gap-2">
                                <div>
                                    <InputText className="mt-1" value={controller.tempat_lahir} error={errors.tempat_lahir} onChange={(value) => onSetController("tempat_lahir", value)} placeholder="Tempat Lahir" />
                                </div>
                                <small>,</small>
                                <div>
                                    <InputDate className="mt-1" value={controller.tanggal_lahir} error={errors.tanggal_lahir} onChange={(value) => onSetController("tanggal_lahir", value)} placeholder="..." />
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <div className="flex-grow">
                                <AgamaModal value={controller.agama} error={errors.agama} onChange={(value) => onSetController('agama', value)} />
                            </div>
                            <div className="flex-grow">
                                <span className="font-medium">Suku Bangsa</span>
                                <InputText className="mt-1" value={controller.suku_bangsa} error={errors.suku_bangsa} onChange={(value) => onSetController('suku_bangsa', value)} placeholder="..." />
                            </div>
                        </div>
                        <div>
                            <span className="font-medium">Pangkat</span>
                            <InputText className="mt-1" value={controller.pangkat} error={errors.pangkat} onChange={(value) => onSetController("pangkat", value)} placeholder="..." />
                        </div>
                        <div>
                            <span className="font-medium">Jabatan</span>
                            <InputArea className="mt-1" value={controller.jabatan} error={errors.jabatan} onChange={(value) => onSetController("jabatan", value)} placeholder="..." />
                        </div>
                        <div className="flex flex-col leading-3 mt-2">
                            <div className="flex gap-3">
                                <span className="font-medium">Masa Jabatan</span>
                                <small>(Opsional)</small>
                            </div>
                            <hr className="my-1" />
                            <div className="flex items-center gap-2">
                                <div>
                                    <InputDate className="mt-1" value={controller.date_from} error={errors.date_from} onChange={(value) => onSetController("date_from", value)} placeholder="..." />
                                </div>
                                <small>s/d</small>
                                <div>
                                    <InputDate className="mt-1" value={controller.date_to} error={errors.date_to} onChange={(value) => onSetController("date_to", value)} placeholder="..." />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col leading-3 mt-2">
                            <span className="font-medium">Leting</span>
                            <hr className="my-1" />
                            <div className="flex items-center gap-2">
                                <div>
                                    <InputText className="mt-1" value={controller.leting} error={errors.leting} onChange={(value) => onSetController("leting", value)} placeholder="..." />
                                </div>
                                <small>-</small>
                                <div>
                                    <InputNumber className="mt-1" value={controller.leting_tahun} error={errors.leting_tahun} onChange={(value) => onSetController("leting_tahun", value)} placeholder="Tahun" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <span className="font-medium">HP</span>
                            <InputText className="mt-1" value={controller.no_hp} error={errors.no_hp} onChange={(value) => onSetController("no_hp", value)} placeholder="..." />
                        </div>
                        <div>
                            <span className="font-medium">Alamat</span>
                            <InputArea className="mt-1" value={controller.alamat} error={errors.alamat} onChange={(value) => onSetController("alamat", value)} placeholder="..." />
                        </div>
                        <div>
                            <span className="font-medium">Keterangan</span>
                            <InputArea className="mt-1" value={controller.deskripsi} error={errors.deskripsi} onChange={(value) => onSetController("deskripsi", value)} placeholder="..." />
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

export default UpdatePurnawirawanSatuanModal;
