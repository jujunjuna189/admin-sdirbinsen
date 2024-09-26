import { Button, Content, InputArea, InputFileAll, InputText } from "../../../../components";
import { UseLearningResponsibilityCreateContext } from "../../../../contexts/learning/LearningResponsibilityCreateContext";
import { getLocalUser } from "../../../../utils";
import { SatuanModal } from "../../../personil/component";

const LearningResponsibilityCreatePage = () => {
    const { navigation, element, controller, errors, onSetController, onSaveAndAdd, onSave } = UseLearningResponsibilityCreateContext();

    return (
        <Content element={element}>
            <div className="flex gap-2 items-center cursor-pointer" onClick={() => navigation(-1)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M15 6l-6 6l6 6"></path>
                </svg>
                <span className="font-semibold text-base text-slate-800">Tambah Buku Pintar - Tugas dan Tanggung Jawab</span>
            </div>
            <div className="flex justify-center">
                <div className="border rounded-lg p-3 w-full max-w-[652px]">
                    <span className="text-base font-medium">Tambah Buku Pintar</span>
                    <div className="flex flex-col gap-3 mt-3">
                        {!getLocalUser()?.auth?.user?.satuan_id && (<SatuanModal value={controller.satuan_id?.nama} error={errors.satuan_id} onChange={(value) => onSetController("satuan_id", value)} />)}
                        <div>
                            <span className="font-medium">Judul</span>
                            <InputText className="mt-1" value={controller.title} error={errors.title} onChange={(value) => onSetController("title", value)} placeholder="..." />
                        </div>
                        <div>
                            <span className="font-medium">Unggah File</span>
                            <div className="flex gap-2 items-center border rounded-lg pl-2 mt-2">
                                <div className="grow">{controller.file?.name ? <span className="">{controller.file?.name}</span> : <span className="text-slate-400">Nama File...</span>}</div>
                                <InputFileAll error={errors.file} onChange={(value) => onSetController('file', value)} />
                            </div>
                        </div>
                        <div>
                            <div className="flex flex-col leading-4">
                                <span className="font-medium">Keterangan</span>
                                <small>Isi "-" (strip) jika tidak ditambahkan keterangan</small>
                            </div>
                            <InputArea className="mt-3" value={controller.description} error={errors.description} onChange={(value) => onSetController('description', value)} placeholder="..." />
                        </div>
                    </div>
                    <div className="flex justify-end mt-8 mb-3 gap-2">
                        <Button className="border" onClick={() => onSaveAndAdd()}>{`Simpan & Tambah Lagi`}</Button>
                        <Button className="bg-slate-700 text-white" onClick={() => onSave()}>
                            Simpan
                        </Button>
                    </div>
                </div>
            </div>
        </Content>
    );
}

export default LearningResponsibilityCreatePage;