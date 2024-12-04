import { Button, Content, InputText } from "../../../../components";
import { UsePetaJabatanCreateContext } from "../../../../contexts/peta_jabatan/PetaJabatanCreateContext";
import { getLocalUser } from "../../../../utils";
import { SatuanModal } from "../../../personil/component";
import { ChoosePersonilModal } from "../../component";

const PetaJabatanCreatePage = () => {
    const { navigation, element, controller, errors, onSetController, onSave, onSaveAndAdd } = UsePetaJabatanCreateContext();

    return (
        <Content element={element}>
            <div className="flex gap-2 items-center cursor-pointer" onClick={() => navigation(-1)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M15 6l-6 6l6 6"></path>
                </svg>
                <span className="font-semibold text-base text-slate-800">Tambah Peta Jabatan</span>
            </div>
            <div className="flex justify-center">
                <div className="border rounded-lg p-3 w-full max-w-[652px]">
                    <span className="text-base font-medium">Tambah Peta Jabatan</span>
                    <div className="flex flex-col gap-3 mt-3">
                        {!getLocalUser()?.auth?.user?.satuan_id && (<SatuanModal value={controller.satuan_id?.nama} error={errors.satuan_id} onChange={(value) => onSetController("satuan_id", value)} />)}
                        <div>
                            <ChoosePersonilModal value={controller.personil?.nama} error={errors.personil_id} onChange={(value) => onSetController("personil", value)} />
                        </div>
                        <div>
                            <span className="font-medium">Kelompok Jabatan</span>
                            <InputText value={controller.golongan} error={errors.golongan} onChange={(value) => onSetController("golongan", value)} placeholder="..." />
                        </div>
                        <div>
                            <span className="font-medium">Nama Jabatan</span>
                            <InputText className="mt-1" value={controller.jabatan} error={errors.jabatan} onChange={(value) => onSetController("jabatan", value)} placeholder="..." />
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
};
export default PetaJabatanCreatePage;
