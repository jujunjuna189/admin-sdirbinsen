import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSatuanPrestasiRequest } from "../../api/SatuanPrestasiRequest";
import { getSatuanDetailRequest } from "../../api/SatuanRequest";
import { HimneTrakorpsDetail, MarsTrakorpsDetail, PejabatDansatTrakorpsDetail, PrestasiTrakorpsDetail, SejarahTrakorpsDetail } from "../../pages/trakorps/component";

const TrakorpsDetailContext = createContext();

export const TrakorpsDetailContextProvider = ({ children }) => {
  const navigation = useNavigate();
  const params = useParams();
  const [element] = useState(false);
  const [satuan, setSatuan] = useState({});
  const [satuanPrestasi, setSatuanPrestasi] = useState({});
  const [navTrakorpsActive, setNavTrakorpsActive] = useState({});
  const [navTrakorps, setNavTrakorps] = useState([
    {
      title: "Sejarah",
      page: 1,
      onClick: () => { },
      isActive: false,
    },
    {
      title: "Data Prestasi",
      page: 2,
      onClick: () => onGetSatuanPrestasi(),
      isActive: false,
    },
    {
      title: "Data Pejabat Dansat",
      page: 3,
      onClick: () => { },
      isActive: false,
    },
    {
      title: "Lagu Mars",
      page: 4,
      onClick: () => { },
      isActive: false,
    },
    {
      title: "Lagu Himne",
      page: 5,
      onClick: () => { },
      isActive: false,
    },
  ]);

  const getSatuan = async ({ satuan_id = null }) => {
    await getSatuanDetailRequest({ id: satuan_id }).then((res) => {
      setSatuan(res);
    });
  };

  const onGetSatuanPrestasi = async () => {
    await getSatuanPrestasiRequest().then((res) => {
      setSatuanPrestasi(res);
    });
  };

  const onTabSwitch = (indexItem) => {
    navTrakorps.forEach((item, index) => {
      navTrakorps[index].isActive = false;
    });

    navTrakorps[indexItem].isActive = true;
    navTrakorps[indexItem].onClick();
    setNavTrakorpsActive({ ...navTrakorps[indexItem] });
    setNavTrakorps([...navTrakorps]);
  };

  const onGetContent = (page) => {
    const content = {
      1: <SejarahTrakorpsDetail satuan={satuan} onSave={() => getSatuan({ satuan_id: params.id })} />,
      2: <PrestasiTrakorpsDetail satuan={satuan} satuanPrestasi={satuanPrestasi} onSave={() => onGetSatuanPrestasi()} />,
      3: <PejabatDansatTrakorpsDetail />,
      4: <MarsTrakorpsDetail satuan={satuan} />,
      5: <HimneTrakorpsDetail satuan={satuan} />,
    };

    return content[page];
  };

  useEffect(() => {
    getSatuan({ satuan_id: params.id });
    onTabSwitch(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <TrakorpsDetailContext.Provider value={{ navigation, element, satuan, navTrakorps, navTrakorpsActive, onTabSwitch, onGetContent }}>{children}</TrakorpsDetailContext.Provider>;
};

export const UseTrakorpsDetailContext = () => {
  return useContext(TrakorpsDetailContext);
};
