import { createContext, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteMaterialRequest, getMaterialRequest } from "../../api/MaterialRequest";
import { ConfirmDeleteModal } from "../../components";
import { ConverUrl } from "../../utils/convert/UrlConvert";
import { getLocalUser } from "../../utils";

const MaterialContext = createContext();

export const MaterialContextProvider = ({ children }) => {
  const navigation = useNavigate();
  const location = useLocation();
  const [element, setElement] = useState(false);
  const [material, setMaterial] = useState({});
  const [categoryActive, setCategoryActive] = useState({});
  const [category, setCategory] = useState([]);

  const onGetMaterialKategori = async () => {
    const category = {
      "sistem-utama": [
        {
          title: "Satbak",
          key: 'satbak',
          isActive: false,
        },
        {
          title: "Pibak",
          key: 'pibak',
          isActive: false,
        },
        {
          title: "Pencari & Penemu Sas",
          key: 'pencari-penemu-sas',
          isActive: false,
        },
        {
          title: "Kodal",
          key: 'kodal',
          isActive: false,
        },
        {
          title: "Logistik",
          key: 'logistik',
          isActive: false,
        },
        {
          title: "Kurmed",
          key: 'kurmed',
          isActive: false,
        },
        {
          title: "Komunikasi",
          key: 'komunikasi',
          isActive: false,
        },
        {
          title: "Taktik",
          key: 'taktik',
          isActive: false,
        },
        {
          title: "Meteorologi",
          key: 'meteorologi',
          isActive: false,
        },
        {
          title: "Pengamanan",
          key: 'pengamanan',
          isActive: false,
        },
      ],
      "sistem-pendukung": [
        {
          title: "Matsus",
          key: 'matsus',
          isActive: false,
        },
        {
          title: "Ranmin",
          key: 'ranmin',
          isActive: false,
        },
      ],
      "mkb": [
        {
          title: "Munisi Bp",
          key: 'munisi-bp',
          isActive: false,
        },
        {
          title: "Munisi Operational Latihan",
          key: 'munisi-operational-latihan',
          isActive: false,
        },
      ],
    };

    settingMaterialCategory(category?.[location.state?.category?.key] ?? []);
  };

  const settingMaterialCategory = (res) => {
    var datas = [];
    var indexData = res.findIndex((x) => x.key === (location?.state?.type?.key));
    if (indexData < 0) (indexData = 0);
    res.forEach((item, index) => {
      item.isActive = index === indexData ? true : false;
      datas.push({ ...item });
    });
    setCategory([...datas]);
    setCategoryActive({ ...datas[indexData] });
    onGetMaterial({ jenis: datas?.[indexData]?.key });
  };

  const onTabSwitch = (indexItem) => {
    category.forEach((item, index) => {
      category[index].isActive = false;
    });

    category[indexItem].isActive = true;
    setCategory([...category]);
    setCategoryActive({ ...category[indexItem] });
    onGetMaterial({ jenis: category[indexItem].key });
  };

  const onGetMaterial = async ({ jenis = null }) => {
    setMaterial({});
    await getMaterialRequest({ kategori: location.state?.category?.key, jenis: ConverUrl(jenis), satuan_id: getLocalUser()?.auth?.user?.satuan_id }).then((res) => {
      res === undefined && (res = {});
      res === null && (res = {});
      setMaterial(res);
    });
  };

  const onShowConfirmDelete = (material_id) => {
    setElement(<ConfirmDeleteModal onClickOutside={() => setElement(false)} onCancel={() => setElement(false)} onSave={() => onDeleteMaterial({ material_id: material_id })} />);
  };

  const onDeleteMaterial = async ({ material_id = null }) => {
    await deleteMaterialRequest({ material_id: material_id }).then((res) => {
      setElement(false);
      onGetMaterial({ jenis: categoryActive.key });
    });
  };

  useEffect(() => {
    onGetMaterialKategori();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  return <MaterialContext.Provider value={{ navigation, location, element, material, category, categoryActive, onTabSwitch, onShowConfirmDelete, setCategoryActive }}>{children}</MaterialContext.Provider>;
};

export const UseMaterialContext = () => {
  return useContext(MaterialContext);
};
