import { Button, Card, Content, EmptyData, InputSearch, TableLoader } from "../../components";
import { UseMaterialContext } from "../../contexts/material/MaterialContext";
import { dateFormatterV4, getLocalUser } from "../../utils";

const MaterialPage = () => {
  const { navigation, location, element, material, category, categoryActive, onTabSwitch, onShowConfirmDelete } = UseMaterialContext();

  const renderTable = () => {
    return (
      <table className="w-full border-collapse">
        <thead className="bg-slate-50">
          <tr>
            <th className="border-b-[1.5px] border-slate-200 px-3 py-2 text-start">No</th>
            {["taktik", "pengamanan"].includes(categoryActive?.key) !== true && (
              <>
                <th className="border-b-[1.5px] border-slate-200 px-3 py-2 text-start">Gambar</th>
              </>
            )}
            <th className="border-b-[1.5px] border-slate-200 px-3 py-2 text-start">
              {["taktik", "pengamanan"].includes(categoryActive?.key) !== true ? "Nama" : "Judul"}
            </th>
            {["taktik", "pengamanan"].includes(categoryActive?.key) !== true && (
              <>
                <th className="border-b-[1.5px] border-slate-200 px-3 py-2 text-start">Kategori</th>
                <th className="border-b-[1.5px] border-slate-200 px-3 py-2 text-start">Komponen</th>
                <th className="border-b-[1.5px] border-slate-200 px-3 py-2 text-start">Kondisi</th>
                <th className="border-b-[1.5px] border-slate-200 px-3 py-2 text-start">Jumlah</th>
              </>
            )}
            <th className="border-b-[1.5px] border-slate-200 px-3 py-2 text-start">Satuan</th>
            <th className="border-b-[1.5px] border-slate-200 px-3 py-2 text-start">Keterangan</th>
            {["munisi-bp"].includes(categoryActive?.key) === true && (
              <th className="border-b-[1.5px] border-slate-200 px-3 py-2 text-start">Lokasi</th>
            )}
            <th className="border-b-[1.5px] border-slate-200 px-3 py-2 text-start">Dibuat</th>
            <th className="border-b-[1.5px] border-slate-200 pl-3 pr-5 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {material?.data?.map((item, index) => {
            return (
              <tr key={index}>
                <td className="border-b-[1.5px] border-slate-200 px-3 py-2">{index + 1}</td>
                {["taktik", "pengamanan"].includes(categoryActive?.key) !== true && (
                  <>
                    <td className="border-b-[1.5px] border-slate-200 px-3 py-2">
                      {!item.file && <span>-</span>}
                      {item.file && (<img src={item.file} alt="IMG-material" className="h-10 object-cover" />)}
                    </td>
                  </>
                )}
                <td className="border-b-[1.5px] border-slate-200 px-3 py-2">{item.nama}</td>
                {["taktik", "pengamanan"].includes(categoryActive?.key) !== true && (
                  <>
                    <td className="border-b-[1.5px] border-slate-200 px-3 py-2">{item.kategori}</td>
                    <td className="border-b-[1.5px] border-slate-200 px-3 py-2">{item.jenis}</td>
                    <td className="border-b-[1.5px] border-slate-200 px-3 py-2">{item.kondisi}</td>
                    <td className="border-b-[1.5px] border-slate-200 px-3 py-2">{item.jumlah}</td>
                  </>
                )}
                <td className="border-b-[1.5px] border-slate-200 px-3 py-2">{item.satuan?.nama ?? ""}</td>
                <td className="border-b-[1.5px] border-slate-200 px-3 py-2">{item.keterangan ?? ""}</td>
                {["munisi-bp"].includes(categoryActive?.key) === true && (
                  <td className="border-b-[1.5px] border-slate-200 px-3 py-2">{item.lokasi ?? ""}</td>
                )}
                <td className="border-b-[1.5px] border-slate-200 px-3 py-2">{dateFormatterV4(item.created_at)}</td>
                <td className="border-b-[1.5px] border-slate-200 pl-3 pr-5 py-2">
                  <div className="flex gap-3 justify-end">
                    {getLocalUser()?.auth?.permission["binmat.update"] && (
                      <Button className="border py-[0.2rem] bg-yellow-50 border-yellow-800 text-yellow-800" onClick={() => navigation(`/material/update/${item.id}`, { state: { ...location.state, type: { ...categoryActive } } })}>
                        Ubah
                      </Button>
                    )}
                    {getLocalUser()?.auth?.permission["binmat.delete"] && (
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
        <span className="font-bold text-xl text-slate-800">Daftar Materiel</span>
        {getLocalUser()?.auth?.permission["binmat.create"] && (
          <div>
            <Button className="bg-red-800 text-white cursor-pointer" onClick={() => navigation(`/material/create`, { state: { ...location.state, type: { ...categoryActive } } })}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M12 5l0 14"></path>
                <path d="M5 12l14 0"></path>
              </svg>
              Tambah
            </Button>
          </div>
        )}
      </div>
      <div className="my-3 flex flex-wrap gap-2">
        {category.map((item, index) => {
          return (
            <Button key={index} className={`${item.isActive ? "bg-slate-600 text-white" : "bg-white text-slate-900"} border`} onClick={() => onTabSwitch(index)}>
              {item.title}
            </Button>
          );
        })}
      </div>
      <div className="mt-4">
        <Card>
          <div className="mb-3 px-5">
            <div className="flex justify-between">
              <div className="inline-block">
                <Button className="border-2 border-slate-100">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M4 4h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414v7l-6 2v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227z"></path>
                  </svg>
                  Filter
                </Button>
              </div>
              <InputSearch placeholder="Cari..." className="shadow-none" onChange={(value) => console.log(value)} />
            </div>
          </div>
          <div className="overflow-x-auto">{Object.keys(material).length === 0 ? <TableLoader /> : material.data.length === 0 ? <EmptyData /> : renderTable()}</div>
          <div className="flex justify-end px-5 py-3">
            <span className="font-semibold text-sm">Rows per page: 10</span>
          </div>
        </Card>
      </div>
    </Content>
  );
};
export default MaterialPage;
