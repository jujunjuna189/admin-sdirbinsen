import { createContext, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createSiapsatRequest } from "../../api/SiapsatRequest";
import { ErrorPopup, LoaderPopup, SuccessPopup } from "../../components";

const SiapsatCreateContext = createContext();

export const SiapsatCreateContextProvider = ({ children }) => {
  const navigation = useNavigate();
  const location = useLocation();
  const [element, setElement] = useState(false);
  const [controller, setController] = useState({
    title: location.state.sub_category,
    category: location.state.category,
    satuan_id: location.state.satuan_id,
  });
  const [errors, setErrors] = useState({});

  const onSetController = (field, value) => {
    setController({ ...controller, [field]: value });
  };

  const onSave = async () => {
    setElement(<LoaderPopup />);
    let dataBatch = { ...controller };
    dataBatch.image = dataBatch.picture?.file ?? null;
    await createSiapsatRequest({ body: dataBatch }).then((res) => {
      res?.errors && setErrors(res?.errors);
      res?.errors && setElement(<ErrorPopup />);
      !res?.errors && setElement(<SuccessPopup />);
      setTimeout(() => {
        setElement(false);
        !res?.errors && navigation(location?.state?.path ?? `/siapsat`, { state: { ...location.state, title: location.state.title, category: location.state.category } });
      }, 1000);
    });
  };

  const onSaveAndAdd = async () => {
    setElement(<LoaderPopup />);
    let dataBatch = { ...controller };
    dataBatch.image = dataBatch.picture?.file ?? null;
    await createSiapsatRequest({ body: dataBatch }).then((res) => {
      res?.errors && setErrors(res?.errors);
      res?.errors && setElement(<ErrorPopup />);
      !res?.errors && setElement(<SuccessPopup />);
      setTimeout(() => {
        setElement(false);
        !res?.errors && setController({ ...location.state });
      }, 1000);
    });
  };

  return <SiapsatCreateContext.Provider value={{ navigation, location, element, controller, errors, onSetController, onSave, onSaveAndAdd }}>{children}</SiapsatCreateContext.Provider>;
};

export const UseSiapsatCreateContext = () => {
  return useContext(SiapsatCreateContext);
};
