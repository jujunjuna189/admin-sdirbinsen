import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getSatuanRequest } from "../../api/SatuanRequest";
import { getSiapsatRequest } from "../../api/SiapsatRequest";

const SiapsatContext = createContext();

export const SiapsatContextProvider = ({ children }) => {
  const navigation = useNavigate();
  const location = useLocation();
  const [satuan, setSatuan] = useState({});
  const [satuanData, setSatuanData] = useState({});
  const [siapsat, setSiapsat] = useState({});

  const getSatuan = async () => {
    await getSatuanRequest({}).then((res) => {
      res?.data?.length > 0 && (res.data[0].isActive = true);
      res?.data?.length > 0 && (setSatuanData(res.data[0]));
      res?.data?.length > 0 && (onGetSiapsat({ satuan_id: res.data[0].id }));
      setSatuan(res);
    });
  };

  const onChangeTab = (index) => {
    const satuanIndex = satuan.data.findIndex((x) => x.isActive === true);
    satuanIndex >= 0 && (satuan.data[satuanIndex].isActive = false);

    satuan.data[index].isActive = true;
    setSatuan({ ...satuan });
    setSatuanData(satuan.data[index]);
    onGetSiapsat({ satuan_id: satuan.data[index].id });
  }

  const onGetSiapsat = async ({ satuan_id }) => {
    await getSiapsatRequest({ filter: `category=${location.state?.category ?? ''}&satuan_id=${satuan_id}` }).then((res) => {
      setSiapsat(res);
    });
  }

  const onChangeTabSiapsat = (index) => {
    const siapsatIndex = siapsat.data.findIndex((x) => x.isActive === true);
    siapsatIndex >= 0 && (siapsat.data[siapsatIndex].isActive = false);

    siapsat.data[index].isActive = true;
    setSiapsat({ ...siapsat });
  }

  useEffect(() => {
    getSatuan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <SiapsatContext.Provider value={{ navigation, location, satuan, satuanData, siapsat, setSiapsat, onChangeTab, onChangeTabSiapsat }}>{children}</SiapsatContext.Provider>;
};

export const UseSiapsatContext = () => {
  return useContext(SiapsatContext);
};
