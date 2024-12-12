import { Button, Content, InputArea, InputFile, InputNumber, InputText } from "../../../../components";
import { UseMaterialUpdateContext } from "../../../../contexts/material/MaterialUpdateContext";
import { getLocalUser } from "../../../../utils";
import { SatuanModal } from "../../../personil/component";
import { KondisiModal } from "../../component";

const MaterialUpdatePage = () => {
  const { navigation, location, element, controller, errors, onSetController, onSave } = UseMaterialUpdateContext();

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
          <span className="text-base font-medium">Ubah Materiel</span>
          <div className="flex flex-col gap-3 mt-3">
            {!getLocalUser()?.auth?.user?.satuan_id && (<SatuanModal value={controller.satuan_id?.nama} error={errors.satuan_id} onChange={(value) => onSetController("satuan_id", value)} />)}
            <div>
              <span className="font-medium">Kategori</span>
              <InputText className="mt-1" value={controller.kategori} error={errors.kategori} onChange={(value) => onSetController("kategori", value)} readOnly={true} placeholder="..." />
            </div>
            <div>
              <span className="font-medium">Komponen</span>
              <InputText className="mt-1" value={controller.jenis} error={errors.jenis} onChange={(value) => onSetController("jenis", value)} readOnly={true} placeholder="..." />
            </div>
            <div>
              <span className="font-medium">
                {["taktik", "pengamanan"].includes(location.state?.type?.key) !== true ? "Nama" : "Judul"}
              </span>
              <InputText className="mt-1" value={controller.nama} error={errors.nama} onChange={(value) => onSetController("nama", value)} placeholder="..." />
            </div>
            {["taktik", "pengamanan"].includes(location.state?.type?.key) !== true && (
              <>
                <div>
                  <span className="font-medium">Jumlah</span>
                  <InputNumber className="mt-1" value={controller.jumlah} error={errors.jumlah} onChange={(value) => onSetController("jumlah", value)} placeholder="..." />
                </div>
                <div>
                  <KondisiModal value={controller.kondisi} error={errors.kondisi} onChange={(value) => onSetController("kondisi", value)} />
                </div>
                {["munisi-bp"].includes(location.state?.type?.key) === true && (
                  <div>
                    <span className="font-medium">Lokasi</span>
                    <InputText className="mt-1" value={controller.lokasi} error={errors.lokasi} onChange={(value) => onSetController("lokasi", value)} placeholder="..." />
                  </div>
                )}
                <div className="flex gap-5 items-center">
                  <div>
                    <div className="w-32 h-32 bg-slate-100 flex justify-center items-center relative">
                      {controller?.picture?.preview && (<div className="w-full h-full absolute bg-slate-100">
                        <img src={controller?.picture?.preview} alt="ImageProfile" className="object-cover w-full h-full" />
                      </div>)}
                      <div className="flex flex-col gap-1 text-center text-slate-300">
                        <div className="flex justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                            <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                            <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855"></path>
                          </svg>
                        </div>
                        <span className="font-medium">Gambar</span>
                      </div>
                    </div>
                  </div>
                  <div className="grow">
                    <div className="mb-2">
                      <span className="font-medium">Unggah gambar</span><br />
                      <small>Sertakan gambar satuan dengan mengunggah gambar...</small>
                    </div>
                    <div className="flex">
                      <InputFile error={errors.picture} onChange={(value) => onSetController('picture', value)} />
                    </div>
                  </div>
                </div>
              </>
            )}
            <div>
              <span className="font-medium">Keterangan</span>
              <InputArea className="mt-1" value={controller.keterangan} error={errors.keterangan} onChange={(value) => onSetController("keterangan", value)} placeholder="..." />
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
export default MaterialUpdatePage;
