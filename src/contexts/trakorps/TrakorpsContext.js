import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteSatuanRequest, getSatuanRequest } from "../../api/SatuanRequest";
import { ConfirmDeleteModal } from "../../components";

const TrakorpsContext = createContext();

export const TrakorpsContextProvider = ({ children }) => {
  const navigation = useNavigate();
  const [element, setElement] = useState(false);
  const [satuan, setSatuan] = useState({});

  const getSatuan = async () => {
    await getSatuanRequest().then((res) => {
      setSatuan(res);
    });
  };

  const onShowConfirmDelete = (satuan_id) => {
    setElement(<ConfirmDeleteModal onClickOutside={() => setElement(false)} onCancel={() => setElement(false)} onSave={() => onDeleteSatuan({ satuan_id: satuan_id })} />);
  };

  const onDeleteSatuan = async ({ satuan_id }) => {
    await deleteSatuanRequest({ satuan_id: satuan_id }).then((res) => {
      setElement(false);
      getSatuan();
    });
  };

  useEffect(() => {
    getSatuan();
  }, []);

  return <TrakorpsContext.Provider value={{ navigation, element, satuan, onShowConfirmDelete }}>{children}</TrakorpsContext.Provider>;
};

export const UseTrakorpsContext = () => {
  return useContext(TrakorpsContext);
};
