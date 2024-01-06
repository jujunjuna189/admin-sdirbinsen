import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSatuanDetailRequest } from "../../api/SatuanRequest";

const TrakorpsDetailContext = createContext();

export const TrakorpsDetailContextProvider = ({ children }) => {
  const navigation = useNavigate();
  const params = useParams();
  const [satuan, setSatuan] = useState({});
  const [navTrakorps, setNavTrakorps] = useState([
    {
      title: "Sejarah",
      isActive: true,
    },
    {
      title: "Data Prestasi",
      isActive: false,
    },
    {
      title: "Data Pejabat Dansat",
      isActive: false,
    },
    {
      title: "Lagu Satuan",
      isActive: false,
    },
  ]);

  const getSatuan = async ({ satuan_id = null }) => {
    await getSatuanDetailRequest({ id: satuan_id }).then((res) => {
      setSatuan(res);
    });
  };

  const onTabSwitch = (indexItem) => {
    navTrakorps.forEach((item, index) => {
      navTrakorps[index].isActive = false;
    });

    navTrakorps[indexItem].isActive = true;
    setNavTrakorps([...navTrakorps]);
  };

  useEffect(() => {
    getSatuan({ satuan_id: params.id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <TrakorpsDetailContext.Provider value={{ navigation, satuan, navTrakorps, onTabSwitch }}>{children}</TrakorpsDetailContext.Provider>;
};

export const UseTrakorpsDetailContext = () => {
  return useContext(TrakorpsDetailContext);
};
