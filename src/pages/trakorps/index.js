import { Button, Card, Content, EmptyData, TableLoader } from "../../components";
import { UseTrakorpsContext } from "../../contexts/trakorps/TrakorpsContext";
import { getLocalUser } from "../../utils";

const TrakorpsPage = () => {
  const { navigation, element, satuan, onShowConfirmDelete } = UseTrakorpsContext();

  const renderTable = () => {
    return (
      <table className="w-full border-collapse">
        <thead className="bg-slate-50">
          <tr>
            <th className="border-b-[1.5px] border-slate-200 pl-5 pr-3 py-2 text-start">
              <div className="flex gap-5 items-center">
                <input type="checkbox" className="" />
                Logo
              </div>
            </th>
            <th className="border-b-[1.5px] border-slate-200 px-3 py-2 text-start">Nama</th>
            <th className="border-b-[1.5px] border-slate-200 pl-3 pr-5 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {satuan?.data?.map((item, index) => {
            return (
              <tr key={index}>
                <td className="border-b-[1.5px] border-slate-200 pl-5 pr-3 py-2">
                  <div className="flex gap-5 items-center">
                    <input type="checkbox" className="" />
                    <img src={item.logo} alt={item.nama} className={`h-10 aspect-square rounded-lg ${!item.logo && "bg-slate-400"}`} />
                  </div>
                </td>
                <td className="border-b-[1.5px] border-slate-200 px-3 py-2">{item.nama}</td>
                <td className="border-b-[1.5px] border-slate-200 pl-3 pr-5 py-2">
                  <div className="flex gap-3 justify-end">
                    <Button className="border py-[0.2rem] bg-green-50 border-green-800 text-green-800" onClick={() => navigation(`/trakorps/detail/${item.id}`)}>
                      Detail
                    </Button>
                    {getLocalUser()?.auth?.permission?.["trakorps.delete"] && (
                      <Button className="border py-[0.2rem] bg-red-50 border-red-800 text-red-800" onClick={() => onShowConfirmDelete(item.id)}>
                        Hapus
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  return (
    <Content element={element}>
      <div className="flex flex-wrap justify-between items-center">
        <span className="font-bold text-xl text-slate-800">Daftar Satuan</span>
        {getLocalUser()?.auth?.permission?.["trakorps.delete"] && (
          <div>
            <Button className="bg-red-800 text-white cursor-pointer" onClick={() => navigation("/trakorps/create")}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M12 5l0 14"></path>
                <path d="M5 12l14 0"></path>
              </svg>
              Tambah Satuan
            </Button>
          </div>
        )}
      </div>
      <div className="mt-4">
        <Card>
          <div className="mb-3 px-5">
            <div className="inline-block">
              <Button className="border-2 border-slate-100">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M4 4h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414v7l-6 2v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227z"></path>
                </svg>
                Filter
              </Button>
            </div>
          </div>
          <div className="overflow-x-auto">{Object.keys(satuan ?? {})?.length === 0 ? <TableLoader /> : satuan?.data?.length === 0 ? <EmptyData /> : renderTable()}</div>
          <div className="flex justify-end px-5 py-3">
            <span className="font-semibold text-sm">Rows per page: 10</span>
          </div>
        </Card>
      </div>
    </Content>
  );
};

export default TrakorpsPage;
