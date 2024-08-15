import { Button, Content, InputFileAll, InputText } from "../../../../../components";
import { UseSiapsatBinsatLaplakgiatCreateContext } from "../../../../../contexts/siapsat/SiapsatBinsatLaplakgiatCreateContext";
import { SatuanModal } from "../../../../personil/component";

const SiapsatBinsatLaplakgiatCreatePage = () => {
  const { navigation, element, controller, errors, onSetController, onSave, onSaveAndAdd } = UseSiapsatBinsatLaplakgiatCreateContext();

  return (
    <Content element={element}>
      <div className="flex gap-2 items-center cursor-pointer" onClick={() => navigation(-1)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M15 6l-6 6l6 6"></path>
        </svg>
        <span className="font-semibold text-base text-slate-800">Tambah Binsat Laplakgiat</span>
      </div>
      <div className="flex justify-center">
        <div className="border rounded-lg p-3 w-full max-w-[652px]">
          <span className="text-base font-medium">Tambah Binsat Laplakgiat</span>
          <div className="flex flex-col gap-3 mt-3">
            <SatuanModal value={controller.satuan_id?.nama} error={errors.satuan_id} onChange={(value) => onSetController("satuan_id", value)} />
            <div>
              <span className="font-medium">Nama</span>
              <InputText className="mt-1" value={controller.nama} error={errors.nama} onChange={(value) => onSetController("nama", value)} placeholder="..." />
            </div>
            <div>
              <span className="font-medium">Unggah File</span>
              <div className="flex gap-2 items-center border rounded-lg pl-2 mt-2">
                <div className="grow">{controller.file?.name ? <span className="">{controller.file?.name}</span> : <span className="text-slate-400">Nama File...</span>}</div>
                <InputFileAll error={errors.file} onChange={(value) => onSetController('file', value)} />
              </div>
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
export default SiapsatBinsatLaplakgiatCreatePage;
