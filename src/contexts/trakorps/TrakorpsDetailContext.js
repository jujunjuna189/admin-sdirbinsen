import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getSatuanLainLainRequest } from "../../api/SatuanLainLainRequest";
import { getSatuanLambangRequest } from "../../api/SatuanLambangRequest";
import { getSatuanPejabatDansatRequest } from "../../api/SatuanPejabatDansatRequest";
import { getSatuanPrestasiRequest } from "../../api/SatuanPrestasiRequest";
import { getSatuanDetailRequest } from "../../api/SatuanRequest";
import { getSatuanTradisiRequest } from "../../api/SatuanTradisiRequest";
import { HimneTrakorpsDetail, LainLainTrakorpsDetail, LambangTrakorpsDetail, MarsTrakorpsDetail, PejabatDansatTrakorpsDetail, PrestasiTrakorpsDetail, SejarahTrakorpsDetail, TradisiTrakorpsDetail } from "../../pages/trakorps/component";

const TrakorpsDetailContext = createContext();

export const TrakorpsDetailContextProvider = ({ children }) => {
  const navigation = useNavigate();
  const params = useParams();
  const [element] = useState(false);
  const [satuan, setSatuan] = useState({});
  const [satuanLambang, setSatuanLambang] = useState({});
  const [satuanTradisi, setSatuanTradisi] = useState([]);
  const [satuanPrestasi, setSatuanPrestasi] = useState({});
  const [satuanPejabatDansat, setSatuanPejabatDansat] = useState({});
  const [satuanLainLain, setSatuanLainLain] = useState({});
  const [navTrakorpsActive, setNavTrakorpsActive] = useState({});
  const [navTrakorps, setNavTrakorps] = useState([
    {
      title: "Sejarah",
      page: 1,
      onClick: () => { },
      isActive: false,
    },
    {
      title: "Lambang Satuan",
      page: 2,
      onClick: () => onGetSatuanLambang(),
      isActive: false,
    },
    {
      title: "Tradisi Satuan",
      page: 3,
      onClick: () => onGetSatuanTradisi(),
      isActive: false,
    },
    {
      title: "Data Prestasi",
      page: 4,
      onClick: () => onGetSatuanPrestasi({ satuan_id: params.id }),
      isActive: false,
    },
    {
      title: "Data Pejabat Dansat",
      page: 5,
      onClick: () => onGetSatuanPejabatDansat({ satuan_id: params.id }),
      isActive: false,
    },
    {
      title: "Data Purnawirawan",
      page: 6,
      onClick: () => { },
      isActive: false,
    },
    {
      title: "Lagu Mars",
      page: 7,
      onClick: () => { },
      isActive: false,
    },
    {
      title: "Lagu Himne",
      page: 8,
      onClick: () => { },
      isActive: false,
    },
    {
      title: "Lain-Lain",
      page: 9,
      onClick: () => onGetSatuanLainLain({ satuan_id: params.id }),
      isActive: false,
    },
  ]);

  const getSatuan = async ({ satuan_id = null }) => {
    await getSatuanDetailRequest({ id: satuan_id }).then((res) => {
      setSatuan(res);
    });
  };

  const onGetSatuanLambang = async () => {
    await getSatuanLambangRequest({ filter: `?satuan_id=${params.id}` }).then((res) => {
      setSatuanLambang(res.data[0]);
    });
  }

  const onGetSatuanTradisi = async () => {
    await getSatuanTradisiRequest({ filter: `?satuan_id=${params.id}` }).then((res) => {
      setSatuanTradisi(res.data);
    });
  }

  const onGetSatuanPrestasi = async ({ satuan_id = null }) => {
    await getSatuanPrestasiRequest({ satuan_id: satuan_id }).then((res) => {
      setSatuanPrestasi(res);
    });
  };

  const onGetSatuanPejabatDansat = async ({ satuan_id = null }) => {
    await getSatuanPejabatDansatRequest({ satuan_id: satuan_id }).then((res) => {
      setSatuanPejabatDansat(res);
    });
  };

  const onGetSatuanLainLain = async ({ satuan_id = null }) => {
    await getSatuanLainLainRequest({ satuan_id: satuan_id }).then((res) => {
      setSatuanLainLain(res);
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
      2: <LambangTrakorpsDetail satuan={satuan} satuanLambang={satuanLambang} onSave={() => onGetSatuanLambang()} />,
      3: <TradisiTrakorpsDetail satuan={satuan} satuanTradisi={satuanTradisi} onSave={() => onGetSatuanTradisi()} />,
      4: <PrestasiTrakorpsDetail satuan={satuan} satuanPrestasi={satuanPrestasi} onSave={() => onGetSatuanPrestasi({ satuan_id: params.id })} />,
      5: <PejabatDansatTrakorpsDetail satuan={satuan} satuanPejabatDansat={satuanPejabatDansat} onSave={() => onGetSatuanPejabatDansat({ satuan_id: params.id })} />,
      6: <span>Comming soon</span>,
      7: <MarsTrakorpsDetail satuan={satuan} onSave={() => getSatuan({ satuan_id: params.id })} />,
      8: <HimneTrakorpsDetail satuan={satuan} onSave={() => getSatuan({ satuan_id: params.id })} />,
      9: <LainLainTrakorpsDetail satuan={satuan} satuanLainLain={satuanLainLain} onSave={() => onGetSatuanLainLain({ satuan_id: params.id })} />,
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
