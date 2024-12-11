import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createMaterialRequest } from "../../api/MaterialRequest";
import { ErrorPopup, LoaderPopup, SuccessPopup } from "../../components";
import { getLocalUser } from "../../utils";

const MaterialCreateContext = createContext();

export const MaterialCreateContextProvider = ({ children }) => {
  const navigation = useNavigate();
  const location = useLocation();
  const [element, setElement] = useState(false);
  const [controller, setController] = useState({
    kategori: location.state?.category?.title,
    jenis: location.state?.type?.title,
  });
  const [errors, setErrors] = useState({});

  const onSetController = (field, value) => {
    setController({ ...controller, [field]: value });
  };

  const onSave = async () => {
    setElement(<LoaderPopup />);
    let dataBatch = { ...controller };
    !getLocalUser()?.auth?.user?.satuan_id && (dataBatch.satuan_id = dataBatch.satuan_id?.id ?? null);
    getLocalUser()?.auth?.user?.satuan_id && (dataBatch.satuan_id = getLocalUser()?.auth?.user?.satuan_id ?? null);
    dataBatch.file = dataBatch.picture?.file ?? null;
    dataBatch.kategori = location.state?.category?.key;
    dataBatch.jenis = location.state?.type?.key;
    dataBatch.status = 1;
    await createMaterialRequest({ body: dataBatch }).then((res) => {
      res?.errors && setErrors(res?.errors);
      res?.errors && setElement(<ErrorPopup />);
      !res?.errors && setElement(<SuccessPopup />);
      setTimeout(() => {
        setElement(false);
        !res?.errors && navigation(`/material`, { state: { ...location.state } });
      }, 1000);
    });
  };

  const onSaveAndAdd = async () => {
    setElement(<LoaderPopup />);
    let dataBatch = { ...controller };
    !getLocalUser()?.auth?.user?.satuan_id && (dataBatch.satuan_id = dataBatch.satuan_id?.id ?? null);
    getLocalUser()?.auth?.user?.satuan_id && (dataBatch.satuan_id = getLocalUser()?.auth?.user?.satuan_id ?? null);
    dataBatch.file = dataBatch.picture?.file ?? null;
    dataBatch.kategori = location.state?.category?.key;
    dataBatch.jenis = location.state?.type?.key;
    dataBatch.status = 1;
    await createMaterialRequest({ body: dataBatch }).then((res) => {
      res?.errors && setErrors(res?.errors);
      res?.errors && setElement(<ErrorPopup />);
      !res?.errors && setElement(<SuccessPopup />);
      setTimeout(() => {
        setElement(false);
        !res?.errors && setController({
          kategori: location.state?.category?.title,
          jenis: location.state?.type?.title,
        });
      }, 1000);
    });
  };

  useEffect(() => {
    console.log(location);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <MaterialCreateContext.Provider value={{ navigation, location, element, controller, errors, onSetController, onSave, onSaveAndAdd }}>{children}</MaterialCreateContext.Provider>;
};

export const UseMaterialCreateContext = () => {
  return useContext(MaterialCreateContext);
};
