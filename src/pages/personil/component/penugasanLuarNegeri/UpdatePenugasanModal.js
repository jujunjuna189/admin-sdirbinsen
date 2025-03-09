import { useEffect, useRef, useState } from "react";
import { Button, InputNumber, InputText } from "../../../../components";
import { getPenugasanLuarNegeriByPersonilDetailRequest, updatePenugasanLuarNegeriByPersonilRequest } from "../../../../api/PenugasanLuarNegeriRequest";

const UpdatePenugasanModal = (props) => {
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

  const getPangkat = async () => {
    await getPenugasanLuarNegeriByPersonilDetailRequest({ personil_id: props.personil_id, penugasan_luar_negeri_id: props.item?.id }).then((res) => {
      setController({
        macam_tugas: res.macam_tugas,
        tahun: res.tahun,
        negara: res.negara,
        prestasi_to: res.prestasi?.split(' ')?.[0]?.split('-')?.[1],
        prestasi_from: res.prestasi?.split(' ')?.[1]?.split('-')?.[1],
      });
    });
  }

  const onSave = async () => {
    let dataBatch = { ...controller };
    dataBatch.personil_id = props.personil_id;
    await updatePenugasanLuarNegeriByPersonilRequest({ personil_id: props.personil_id, penugasan_luar_negeri_id: props.item?.id, body: dataBatch }).then((res) => {
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
        getPangkat();
      }}>
        <div className="border p-1 rounded-md cursor-pointer bg-yellow-50 border-yellow-700 text-yellow-700">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4"></path>
            <path d="M13.5 6.5l4 4"></path>
          </svg>
        </div>
      </div>
      <div className={`fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center z-10 ${!isShow && "hidden"}`}>
        <div className="absolute w-full h-full bg-black opacity-30 z-10" onClick={() => toogleModal()}></div>
        <div className="p-3 border rounded-lg bg-white w-96 z-10">
          <div className="leading-3">
            <span className="text-base font-medium">Ubah Penugasan Operasi</span>
            <br />
            <small>Silahkan isi form pangkat</small>
          </div>
          <div className="min-h-[25vh] flex flex-col gap-1 py-2 my-2">
            <div>
              <span className="font-medium">Macam Tugas</span>
              <InputText className="mt-1" value={controller.macam_tugas} error={errors.macam_tugas} onChange={(value) => onSetController("macam_tugas", value)} placeholder="..." />
            </div>
            <div>
              <span className="font-medium">Tahun</span>
              <InputNumber className="mt-1" value={controller.tahun} error={errors.tahun} onChange={(value) => onSetController("tahun", value)} placeholder="2023" />
            </div>
            <div>
              <span className="font-medium">Negara</span>
              <InputText className="mt-1" value={controller.negara} error={errors.negara} onChange={(value) => onSetController("negara", value)} placeholder="..." />
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

export default UpdatePenugasanModal;
