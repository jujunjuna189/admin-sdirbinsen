import { Button, Content, InputNumber, InputText } from "../../../../components";
import { UseSiapsatUpdateContext } from "../../../../contexts/siapsat/SiapsatUpdateContext";
import { SatuanModal } from "../../../personil/component";

const SiapsatUpdatePage = () => {
  const { navigation, element, controller, errors, onSetController, onSave } = UseSiapsatUpdateContext();

  return (
    <Content element={element}>
      <div className="flex gap-2 items-center cursor-pointer" onClick={() => navigation(-1)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M15 6l-6 6l6 6"></path>
        </svg>
        <span className="font-semibold text-base text-slate-800">Ubah Materiel</span>
      </div>
      <div className="flex justify-center">
        <div className="border rounded-lg p-3 w-full max-w-[652px]">
          <span className="text-base font-medium">Tambah Siapsat</span>
          <div className="flex flex-col gap-3 mt-3">
            <SatuanModal value={controller.satuan_id?.nama} error={errors.satuan_id} onChange={(value) => onSetController("satuan_id", value)} />
            <div>
              <span className="font-medium">Kategori</span>
              <InputText className="mt-1" value={controller.kategori} error={errors.kategori} onChange={(value) => onSetController("kategori", value)} readOnly={true} placeholder="..." />
            </div>
            <div>
              <span className="font-medium">Kuantitatif</span>
              <InputNumber className="mt-1" value={controller.kuantitatif} error={errors.kuantitatif} onChange={(value) => onSetController("kuantitatif", value)} placeholder="..." />
            </div>
            <div>
              <span className="font-medium">Kualitatif</span>
              <InputNumber className="mt-1" value={controller.kualitatif} error={errors.kualitatif} onChange={(value) => onSetController("kualitatif", value)} placeholder="..." />
            </div>
            <div>
              <span className="font-medium">Kemantapan</span>
              <InputNumber className="mt-1" value={controller.kemantapan} error={errors.kemantapan} onChange={(value) => onSetController("kemantapan", value)} placeholder="..." />
            </div>
            <div>
              <span className="font-medium">Link File</span>
              <InputText className="mt-1" value={controller.file} error={errors.file} onChange={(value) => onSetController("file", value)} placeholder="https://drive.google.com" />
            </div>
          </div>
          <div className="flex justify-end mt-8 mb-3 gap-2">
            <Button className="bg-slate-700 text-white" onClick={() => onSave()}>
              Simpan
            </Button>
          </div>
        </div>
      </div>
    </Content>
  );
};
export default SiapsatUpdatePage;
