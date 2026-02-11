import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getSatuanRequest } from "../../api/SatuanRequest";
import { deleteSiapsatRequest, getSiapsatRequest } from "../../api/SiapsatRequest";
import { ConfirmDeleteModal } from "../../components";
import { getPageState, setPageState } from "../../utils";

const SiapsatContext = createContext();

export const SiapsatContextProvider = ({ children }) => {
  const navigation = useNavigate();
  const location = useLocation();
  const [element, setElement] = useState(false);
  const [satuan, setSatuan] = useState({});
  const [satuanData, setSatuanData] = useState({});
  const [siapsat, setSiapsat] = useState({});

  const getSatuan = async () => {
    const savedState = getPageState('siapsat');
    await getSatuanRequest({}).then((res) => {
      let activeIdx = 0;
      res.data.unshift({
          id: '',
          nama: 'Semua',
          isActive: false
      });
      if (savedState?.satuanData?.id) {
        activeIdx = res.data.findIndex((x) => x.id === savedState.satuanData.id);
        if (activeIdx < 0) activeIdx = 0;
      }
      res?.data?.length > 0 && (res.data[activeIdx].isActive = true);
      res?.data?.length > 0 && (setSatuanData(res.data[activeIdx]));
      res?.data?.length > 0 && (onGetSiapsat({ satuan_id: res.data[activeIdx].id }));
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

  const onShowConfirmDelete = (siapsat_id) => {
    setElement(<ConfirmDeleteModal onClickOutside={() => setElement(false)} onCancel={() => setElement(false)} onSave={() => onDeleteSiapsat({ siapsat_id: siapsat_id })} />);
  }

  const onDeleteSiapsat = async ({ siapsat_id = null }) => {
    await deleteSiapsatRequest({ siapsat_id: siapsat_id }).then((res) => {
      setElement(false);
      onGetSiapsat({ satuan_id: satuanData.id });
    });
  }

  useEffect(() => {
    getSatuan();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  useEffect(() => {
    if (satuanData?.id) {
        setPageState('siapsat', { satuanData });
    }
  }, [satuanData]);

  return <SiapsatContext.Provider value={{ navigation, location, element, satuan, satuanData, siapsat, setSiapsat, onChangeTab, onChangeTabSiapsat, onShowConfirmDelete }}>{children}</SiapsatContext.Provider>;
};

export const UseSiapsatContext = () => {
  return useContext(SiapsatContext);
};
