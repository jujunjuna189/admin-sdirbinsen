import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSatuanRequest } from "../../api/SatuanRequest";

const TrakorpsContext = createContext();

export const TrakorpsContextProvider = ({ children }) => {
  const navigation = useNavigate();
  const [satuan, setSatuan] = useState({});

  const getSatuan = async () => {
    await getSatuanRequest().then((res) => {
      setSatuan(res);
    });
  };

  useEffect(() => {
    getSatuan();
  }, []);

  return <TrakorpsContext.Provider value={{ navigation, satuan }}>{children}</TrakorpsContext.Provider>;
};

export const UseTrakorpsContext = () => {
  return useContext(TrakorpsContext);
};
