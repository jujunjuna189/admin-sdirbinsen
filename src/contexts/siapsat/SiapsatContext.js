import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSiapsatKategoriRequest } from "../../api/SiapsatKategoriRequest";
import { deleteSiapsatRequest, getSiapsatRequest } from "../../api/SiapsatRequest";
import { ConfirmDeleteModal } from "../../components";

const SiapsatContext = createContext();

export const SiapsatContextProvider = ({ children }) => {
  const navigation = useNavigate();
  const [element, setElement] = useState(false);
  const [categoryActive, setCategoryActive] = useState({});
  const [category, setCategory] = useState([]);
  const [siapsat, setSiapsat] = useState([]);

  const onGetSiapsatKategori = async () => {
    await getSiapsatKategoriRequest().then((res) => {
      settingMaterialCategory(res.data);
    });
  };

  const settingMaterialCategory = (res) => {
    var datas = [];
    res.forEach((item, index) => {
      datas.push({
        title: item.name,
        isActive: index === 0 ? true : false,
      });
    });
    setCategory([...datas]);
    setCategoryActive({ ...datas[0] });
    onGetSiapsat({ kategori: datas[0].title });
  };

  const onTabSwitch = (indexItem) => {
    category.forEach((item, index) => {
      category[index].isActive = false;
    });

    category[indexItem].isActive = true;
    setCategory([...category]);
    setCategoryActive({ ...category[indexItem] });
    onGetSiapsat({ kategori: category[indexItem].title });
  };

  const onGetSiapsat = async ({ kategori = null }) => {
    setSiapsat({});
    await getSiapsatRequest({ kategori: kategori }).then((res) => {
      res === undefined && (res = {});
      res === null && (res = {});
      setSiapsat(res);
    });
  };

  const onShowConfirmDelete = (siapsat_id) => {
    setElement(<ConfirmDeleteModal onClickOutside={() => setElement(false)} onCancel={() => setElement(false)} onSave={() => onDeleteSiapsat({ siapsat_id: siapsat_id })} />);
  };

  const onDeleteSiapsat = async ({ siapsat_id = null }) => {
    await deleteSiapsatRequest({ siapsat_id: siapsat_id }).then((res) => {
      setElement(false);
      onGetSiapsat({ kategori: categoryActive.title });
    });
  };

  useEffect(() => {
    onGetSiapsatKategori();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <SiapsatContext.Provider value={{ navigation, element, category, categoryActive, siapsat, setSiapsat, onTabSwitch, onShowConfirmDelete }}>{children}</SiapsatContext.Provider>;
};

export const UseSiapsatContext = () => {
  return useContext(SiapsatContext);
};
