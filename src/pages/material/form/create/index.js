import { Button, Content, InputText } from "../../../../components";
import { UseMaterialCreateContext } from "../../../../contexts/material/MaterialCreateContext";
import { getLocalUser } from "../../../../utils";
import { SatuanModal } from "../../../personil/component";
import { KondisiModal } from "../../component";

const MaterialCreatePage = () => {
  const { navigation, element, controller, errors, onSetController, onSave, onSaveAndAdd } = UseMaterialCreateContext();

  return (
    <Content element={element}>
      <div className="flex gap-2 items-center cursor-pointer" onClick={() => navigation(-1)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M15 6l-6 6l6 6"></path>
        </svg>
        <span className="font-semibold text-base text-slate-800">Tambah Materiel</span>
      </div>
      <div className="flex justify-center">
        <div className="border rounded-lg p-3 w-full max-w-[652px]">
          <span className="text-base font-medium">Tambah Materiel</span>
          <div className="flex flex-col gap-3 mt-3">
            {!getLocalUser()?.auth?.user?.satuan_id && (<SatuanModal value={controller.satuan_id?.nama} error={errors.satuan_id} onChange={(value) => onSetController("satuan_id", value)} />)}
            <div>
              <span className="font-medium">Kategori</span>
              <InputText className="mt-1" value={controller.kategori} error={errors.kategori} onChange={(value) => onSetController("kategori", value)} readOnly={true} placeholder="..." />
            </div>
            <div>
              <span className="font-medium">Jenis</span>
              <InputText className="mt-1" value={controller.jenis} error={errors.jenis} onChange={(value) => onSetController("jenis", value)} placeholder="..." />
            </div>
            <div>
              <span className="font-medium">Nomor REG</span>
              <InputText className="mt-1" value={controller.no_reg} error={errors.no_reg} onChange={(value) => onSetController("no_reg", value)} placeholder="..." />
            </div>
            <div>
              <KondisiModal value={controller.kondisi} error={errors.kondisi} onChange={(value) => onSetController("kondisi", value)} />
            </div>
            <div>
              <span className="font-medium">Photo</span>
              <InputText className="mt-1" value={controller.file} error={errors.file} onChange={(value) => onSetController("file", value)} placeholder="https://drive.google.com" />
            </div>
            <div>
              <div className="flex flex-col leading-3">
                <span className="font-medium">Keterangan</span>
                <small>Isi "-" (strip) jika tidak ditambahkan keterangan</small>
              </div>
              <InputText className="mt-1" value={controller.keterangan} error={errors.keterangan} onChange={(value) => onSetController("keterangan", value)} placeholder="..." />
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
export default MaterialCreatePage;
