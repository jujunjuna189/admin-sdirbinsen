import { useEffect, useRef, useState } from "react";
import { getKemampuanBahasaByPersonilDetailRequest, updateKemampuanBahasaRequest } from "../../../../api/KemampuanBahasaRequest";
import { Button, InputSelectDropDown, InputText } from "../../../../components";

const UpdateKemampuanBahasaModal = (props) => {
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

  const getKemampuanBahasaRequest = async () => {
    await getKemampuanBahasaByPersonilDetailRequest({ personil_id: props.personil_id, kemampuan_bahasa_id: props.item.id }).then((res) => {
      setController({
        nama: res.nama,
        jenis_bahasa: { title: res.jenis_bahasa, key: res.jenis_bahasa },
        status: { title: res.status, key: res.status },
      });
    });
  }

  const onSave = async () => {
    let dataBatch = { ...controller };
    dataBatch.personil_id = props.personil_id;
    dataBatch.jenis_bahasa = dataBatch.jenis_bahasa?.key;
    dataBatch.status = dataBatch.status?.key;
    await updateKemampuanBahasaRequest({ personil_id: props.personil_id, kemampuan_bahasa_id: props.item.id, body: dataBatch }).then((res) => {
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
        getKemampuanBahasaRequest();
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
            <span className="text-base font-medium">Ubah Kemampuan Bahasa</span>
            <br />
            <small>Silahkan isi form kemampuan bahasa</small>
          </div>
          <div className="min-h-[25vh] flex flex-col gap-1 py-2 my-2">
            <div>
              <span className="font-medium">Nama Bahasa</span>
              <InputText className="mt-1" value={controller.nama} error={errors.nama} onChange={(value) => onSetController("nama", value)} placeholder="..." />
            </div>
            <div>
              <span className="font-medium">Jenis Bahasa</span>
              <InputSelectDropDown className="mt-1" data={[{ title: 'Daerah', key: 'Daerah' }, { title: 'Asing', key: 'Asing' }]} value={controller.jenis_bahasa?.title} error={errors.jenis_bahasa} onChange={(value) => onSetController("jenis_bahasa", value)} placeholder="..." />
            </div>
            <div>
              <span className="font-medium">Status</span>
              <InputSelectDropDown className="mt-1" data={[{ title: 'Aktif', key: 'Aktif' }, { title: 'Pasif', key: 'Pasif' }]} value={controller.status?.title} error={errors.status} onChange={(value) => onSetController("status", value)} placeholder="..." />
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

export default UpdateKemampuanBahasaModal;
