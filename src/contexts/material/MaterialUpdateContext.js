import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMaterialDetailRequest, updateMaterialRequest } from "../../api/MaterialRequest";
import { ErrorPopup, LoaderPopup, SuccessPopup } from "../../components";
import { getLocalUser } from "../../utils";

const MaterialUpdateContext = createContext();

export const MaterialUpdateContextProvider = ({ children }) => {
  const navigation = useNavigate();
  const param = useParams();
  const [element, setElement] = useState(false);
  const [controller, setController] = useState({});
  const [errors, setErrors] = useState({});

  const onGetMaterialDetail = async () => {
    await getMaterialDetailRequest({ id: param.id }).then((res) => {
      res === undefined && (res = {});
      res === null && (res = {});
      settingController(res);
    });
  };

  const settingController = (res) => {
    let dataBatch = {
      satuan_id: { ...res.satuan },
      kategori: res.kategori,
      jenis: res.jenis,
      no_reg: res.no_reg,
      kondisi: res.kondisi,
      file: res.file,
      keterangan: res.keterangan,
    };

    setController(dataBatch);
  };

  const onSetController = (field, value) => {
    setController({ ...controller, [field]: value });
  };

  const onSave = async () => {
    setElement(<LoaderPopup />);
    let dataBatch = { ...controller };
    !getLocalUser()?.auth?.user?.satuan_id && (dataBatch.satuan_id = dataBatch.satuan?.id ?? null);
    getLocalUser()?.auth?.user?.satuan_id && (dataBatch.satuan_id = getLocalUser()?.auth?.user?.satuan_id ?? null);
    dataBatch.status = "Baik";
    await updateMaterialRequest({ material_id: param.id, body: dataBatch }).then((res) => {
      res?.errors && setErrors(res?.errors);
      res?.errors && setElement(<ErrorPopup />);
      !res?.errors && setElement(<SuccessPopup />);
      setTimeout(() => {
        setElement(false);
        !res?.errors && navigation("/material");
      }, 1000);
    });
  };

  useEffect(() => {
    onGetMaterialDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <MaterialUpdateContext.Provider value={{ navigation, element, controller, errors, onSetController, onSave }}>{children}</MaterialUpdateContext.Provider>;
};

export const UseMaterialUpdateContext = () => {
  return useContext(MaterialUpdateContext);
};
