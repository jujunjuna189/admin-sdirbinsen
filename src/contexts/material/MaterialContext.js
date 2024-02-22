import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteMaterialRequest, getMaterialRequest } from "../../api/MaterialRequest";
import { ConfirmDeleteModal } from "../../components";
import { getMaterialKategoriRequest } from "../../api/MaterialKategoriRequest";
import { ConverUrl } from "../../utils/convert/UrlConvert";
import { getLocalUser } from "../../utils";

const MaterialContext = createContext();

export const MaterialContextProvider = ({ children }) => {
  const navigation = useNavigate();
  const [element, setElement] = useState(false);
  const [material, setMaterial] = useState({});
  const [categoryActive, setCategoryActive] = useState({});
  const [category, setCategory] = useState([]);

  const onGetMaterialKategori = async () => {
    await getMaterialKategoriRequest().then((res) => {
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
    onGetMaterial({ kategori: datas[0].title });
  };

  const onTabSwitch = (indexItem) => {
    category.forEach((item, index) => {
      category[index].isActive = false;
    });

    category[indexItem].isActive = true;
    setCategory([...category]);
    setCategoryActive({ ...category[indexItem] });
    onGetMaterial({ kategori: category[indexItem].title });
  };

  const onGetMaterial = async ({ kategori = null }) => {
    setMaterial({});
    await getMaterialRequest({ kategori: ConverUrl(kategori), satuan_id: getLocalUser()?.auth?.user?.satuan_id }).then((res) => {
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
      onGetMaterial({ kategori: categoryActive.title });
    });
  };

  useEffect(() => {
    onGetMaterialKategori();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <MaterialContext.Provider value={{ navigation, element, material, category, categoryActive, onTabSwitch, onShowConfirmDelete, setCategoryActive }}>{children}</MaterialContext.Provider>;
};

export const UseMaterialContext = () => {
  return useContext(MaterialContext);
};
