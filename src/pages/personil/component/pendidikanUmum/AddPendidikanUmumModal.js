import { useEffect, useRef, useState } from "react";
import { createPendidikanUmumByPersonilRequest } from "../../../../api/PendidikanUmumRequest";
import { Button, InputNumber, InputText } from "../../../../components";

const AddPendidikanUmumModal = (props) => {
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

  const onSave = async () => {
    let dataBatch = { ...controller };
    dataBatch.personil_id = props.personil_id;
    dataBatch.prestasi = `Ke-${controller.prestasi_to} Dari-${controller.prestasi_from}`;
    await createPendidikanUmumByPersonilRequest({ personil_id: props.personil_id, body: dataBatch }).then((res) => {
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
      <div className="cursor-pointer" onClick={() => toogleModal()}>
        <div className="flex gap-3 items-center text-slate-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M12 5l0 14"></path>
            <path d="M5 12l14 0"></path>
          </svg>
          <span className="font-medium">Tambah Pendidikan Umum</span>
        </div>
      </div>
      <div className={`fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center z-10 ${!isShow && "hidden"}`}>
        <div className="absolute w-full h-full bg-black opacity-30 z-10" onClick={() => toogleModal()}></div>
        <div className="p-3 border rounded-lg bg-white w-96 z-10">
          <div className="leading-3">
            <span className="text-base font-medium">Tambah Pendidikan Umum</span>
            <br />
            <small>Silahkan isi form pendidikan umum</small>
          </div>
          <div className="min-h-[25vh] flex flex-col gap-1 py-2 my-2">
            <div>
              <span className="font-medium">Jenis Pendidikan</span>
              <InputText className="mt-1" value={controller.jenis_pendidikan} error={errors.jenis_pendidikan} onChange={(value) => onSetController("jenis_pendidikan", value)} placeholder="..." />
            </div>
            <div>
              <span className="text-[12px] font-medium">Nama Pendidikan/Jurusan/Fakultas/Prodi/Tempat</span>
              <InputText className="mt-1" value={controller.nama_pendidikan} error={errors.nama_pendidikan} onChange={(value) => onSetController("nama_pendidikan", value)} placeholder="..." />
            </div>
            <div>
              <span className="font-medium">Tahun</span>
              <InputNumber className="mt-1" value={controller.tahun} error={errors.tahun} onChange={(value) => onSetController("tahun", value)} placeholder="..." />
            </div>
            <div className="flex flex-col leading-3 mt-2">
              <span className="font-medium">Prestasi</span>
              <hr className="my-1" />
              <div className="flex gap-2">
                <div>
                  <small>Ke</small>
                  <InputNumber className="mt-1" value={controller.prestasi_to} error={errors.prestasi} onChange={(value) => onSetController("prestasi_to", value)} placeholder="..." />
                </div>
                <div>
                  <small>Dari</small>
                  <InputNumber className="mt-1" value={controller.prestasi_from} error={errors.prestasi} onChange={(value) => onSetController("prestasi_from", value)} placeholder="..." />
                </div>
              </div>
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

export default AddPendidikanUmumModal;
