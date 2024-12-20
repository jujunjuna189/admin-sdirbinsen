import { Button, Card, Content, } from "../../components";
import { UseSiapsatContext } from "../../contexts/siapsat/SiapsatContext";

const SiapsatPage = () => {
  const { navigation, element, location, satuan, satuanData, siapsat, onChangeTab, onChangeTabSiapsat, onShowConfirmDelete } = UseSiapsatContext();
  return (
    <Content element={element}>
      <div className="flex flex-wrap justify-between items-center">
        <span className="font-bold text-xl text-slate-800">{location.state?.title ?? "-"}</span>
      </div>
      <div className="h-full py-5 flex gap-3">
        <div className="w-64 max-w-[16rem] min-w-[16rem] overflow-auto h-full">
          {satuan?.data?.map((item, index) => {
            return (
              <Card key={index} className={`mb-2 px-3 ${item.isActive ? "border-red-700" : ""}`} onClick={() => onChangeTab(index)}>
                <div className="flex justify-center">
                  <img src={item.logo} alt={item.nama} className={`h-10 aspect-square rounded-lg ${!item.logo && "bg-slate-400"}`} />
                </div>
                <div className="flex justify-center">
                  <span className="text-center">{item.nama}</span>
                </div>
              </Card>
            );
          })}
        </div>
        <Card className="grow p-5 overflow-auto h-full">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex flex-col leading-3">
              <span className="font-bold text-xl text-slate-800">{satuanData?.nama ?? '-'}</span>
            </div>
            <div>
              <Button className="bg-red-800 text-white cursor-pointer" onClick={() => navigation(`/siapsat/create`, { state: { ...location.state, satuan_id: satuanData?.id } })}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M12 5l0 14"></path>
                  <path d="M5 12l14 0"></path>
                </svg>
                Tambah
              </Button>
            </div>
          </div>
          <div className="mt-5">
            {siapsat?.data?.map((item, index) => {
              return (
                <Card key={index} className="border p-5 mt-1">
                  <div className="flex justify-between gap-2 items-center">
                    <div className="flex grow justify-between" onClick={() => onChangeTabSiapsat(index)}>
                      <span>{item.title}</span>
                      <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6 9l6 6l6 -6" /></svg>
                      </span>
                    </div>
                    <div>
                      <Button className="border py-[0.2rem] bg-red-50 border-red-800 text-red-800" onClick={() => onShowConfirmDelete(item.id)}>Hapus</Button>
                    </div>
                  </div>
                  {item?.isActive && (
                    <Card className="p-5 mt-4">
                      {(!item.image && !item.description) && (
                        <span>Tidak ada data</span>
                      )}
                      {item.image && (
                        <div className="flex justify-center">
                          <img src={item.image} alt={item.nama} className={`h-56 aspect-square rounded-lg ${!item.image && "bg-slate-400"}`} />
                        </div>
                      )}
                      {item.description && (
                        <div className="border-t mt-3 py-3" style={{ display: 'flex', whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: item.description }} />
                      )}
                      <div className="flex justify-end border-t mt-5 py-3">
                        <Button className="border py-[0.2rem] bg-yellow-50 border-yellow-800 text-yellow-800" onClick={() => navigation(`/siapsat/update/${item.id}`, { state: { ...location.state, satuan_id: satuanData?.id } })}>
                          Ubah
                        </Button>
                      </div>
                    </Card>
                  )}
                </Card>
              );
            })}
          </div>
        </Card>
      </div>
    </Content>
  );
};

export default SiapsatPage;
