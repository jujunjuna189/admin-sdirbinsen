import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSiapsatDetailRequest, updateSiapsatRequest } from "../../api/SiapsatRequest";
import { ErrorPopup, LoaderPopup, SuccessPopup } from "../../components";

const SiapsatUpdateContext = createContext();

export const SiapsatUpdateContextProvider = ({ children }) => {
  const navigation = useNavigate();
  const param = useParams();
  const [element, setElement] = useState(false);
  const [controller, setController] = useState({});
  const [errors, setErrors] = useState({});

  const onGetSiapsatDetail = async () => {
    await getSiapsatDetailRequest({ id: param.id }).then((res) => {
      res === undefined && (res = {});
      res === null && (res = {});
      settingController(res);
    });
  };

  const settingController = (res) => {
    let dataBatch = {
      satuan_id: { ...res.satuan },
      kategori: res.kategori,
      kuantitatif: res.kuantitatif,
      kualitatif: res.kualitatif,
      kemantapan: res.kemantapan,
      file: res.file,
    };

    setController(dataBatch);
  };

  const onSetController = (field, value) => {
    setController({ ...controller, [field]: value });
  };

  const onSave = async () => {
    setElement(<LoaderPopup />);
    let dataBatch = { ...controller };
    dataBatch.satuan_id = dataBatch.satuan_id?.id ?? null;
    await updateSiapsatRequest({ siapsat_id: param.id, body: dataBatch }).then((res) => {
      res?.errors && setErrors(res?.errors);
      res?.errors && setElement(<ErrorPopup />);
      !res?.errors && setElement(<SuccessPopup />);
      setTimeout(() => {
        setElement(false);
        !res?.errors && navigation("/siapsat");
      }, 1000);
    });
  };

  useEffect(() => {
    onGetSiapsatDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <SiapsatUpdateContext.Provider value={{ navigation, element, controller, errors, onSetController, onSave }}>{children}</SiapsatUpdateContext.Provider>;
};

export const UseSiapsatUpdateContext = () => {
  return useContext(SiapsatUpdateContext);
};
