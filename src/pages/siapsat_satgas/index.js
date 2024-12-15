import { Button, Content, } from "../../components";
import { UseSiapsatSatgasContext } from "../../contexts/siapsat/SiapsatSatgasContext";

const SiapsatSatgasPage = () => {
  const { location, onGetContent, menu, menus, onTabSwitch } = UseSiapsatSatgasContext();
  return (
    <Content>
      <div className="flex flex-wrap justify-between items-center">
        <span className="font-bold text-xl text-slate-800">{location.state?.title ?? "-"}</span>
      </div>
      <div className="flex gap-2 mt-5">
        {menus.map((item, index) => {
          return (
            <Button key={index} className={`${item.isActive ? 'bg-slate-600 text-white' : 'bg-white text-slate-900'} border`} onClick={() => onTabSwitch(index)}>
              {item.title}
            </Button>
          );
        })}
      </div>
      <hr className="mt-2" />
      {onGetContent(menu.page)}
    </Content>
  );
};

export default SiapsatSatgasPage;
