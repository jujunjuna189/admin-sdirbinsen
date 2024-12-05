import { Button, Card, Content } from "../../../components";
import { UseTrakorpsDetailContext } from "../../../contexts/trakorps/TrakorpsDetailContext";
import UpdateSatuanModal from "../component/modal/UpdateSatuanModal";

const TrakorpsDetailPage = () => {
  const { navigation, element, satuan, navTrakorps, navTrakorpsActive, onTabSwitch, onGetContent, onUpdateSatuan } = UseTrakorpsDetailContext();

  return (
    <Content element={element}>
      <div className="flex gap-2 items-center cursor-pointer" onClick={() => navigation(-1)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
          <path d="M15 6l-6 6l6 6"></path>
        </svg>
        <span className="font-semibold text-base text-slate-800">Detail Satuan</span>
      </div>
      <div className="mt-4">
        <Card className="p-5">
          <div className="flex justify-between">
            <div className="flex gap-5 items-center">
              <img src={satuan.logo} alt={satuan.nama} className={`w-14 aspect-square rounded-lg ${!satuan.logo && "bg-slate-400"}`} />
              <div className="flex flex-col leading-3">
                <span>Nama Satuan atau Trakorps</span>
                <span className="text-lg font-bold">{satuan.nama}</span>
              </div>
            </div>
            <div>
              <UpdateSatuanModal satuan={satuan} onSave={() => onUpdateSatuan()} />
            </div>
          </div>
        </Card>
        <div className="flex gap-2 mt-3 mb-1">
          {navTrakorps.map((item, index) => {
            return (
              <Button key={index} className={`border ${item.isActive && "border-red-700 bg-red-50 text-red-700"}`} onClick={() => onTabSwitch(index)}>
                {item.title}
              </Button>
            );
          })}
        </div>
        <div>{onGetContent(navTrakorpsActive.page)}</div>
      </div>
    </Content>
  );
};

export default TrakorpsDetailPage;
