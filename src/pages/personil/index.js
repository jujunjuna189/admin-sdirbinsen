import { Button, Card, Content, EmptyData, InputSearch, SimplePagination, TableLoader } from "../../components";
import { UsePersonilContext } from "../../contexts/personil/PersonilContext";
import { getLocalUser } from "../../utils";

const PersonilPage = () => {
    const { navigation, element, personil, sumberPa, onTabSwitch, onNextPage, onSearch, onShowConfirmDelete } = UsePersonilContext();

    const renderTable = () => {
        return (
            <>
                <table className="w-full border-collapse">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="border-b-[1.5px] border-slate-200 pl-5 pr-3 py-2 text-start">
                                <div className="flex gap-5 items-center">
                                    <input type="checkbox" className="" />
                                    NRP
                                </div>
                            </th>
                            <th className="border-b-[1.5px] border-slate-200 px-3 py-2 text-start">Nama Lengkap</th>
                            <th className="border-b-[1.5px] border-slate-200 px-3 py-2 text-start">Sumber PA</th>
                            <th className="border-b-[1.5px] border-slate-200 pl-3 pr-5 py-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {personil?.data?.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td className="border-b-[1.5px] border-slate-200 pl-5 pr-3 py-2">
                                        <div className="flex gap-5 items-center">
                                            <input type="checkbox" className="" />
                                            {item.nrp}
                                        </div>
                                    </td>
                                    <td className="border-b-[1.5px] border-slate-200 px-3 py-2">
                                        {item.nama}
                                    </td>
                                    <td className="border-b-[1.5px] border-slate-200 px-3 py-2">
                                        {item.sumber_pa}
                                    </td>
                                    <td className="border-b-[1.5px] border-slate-200 pl-3 pr-5 py-2">
                                        <div className="flex gap-3 justify-end">
                                            <Button className="border py-[0.2rem] bg-green-50 border-green-800 text-green-800" onClick={() => navigation(`/personil/detail/${item.id}`)}>Detail</Button>
                                            {getLocalUser()?.auth?.permission['binman.delete'] && (
                                                <Button className="border py-[0.2rem] bg-red-50 border-red-800 text-red-800" onClick={() => onShowConfirmDelete(item.id)}>Hapus</Button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </>
        );
    }

    return (
        <Content element={element}>
            <div className="flex flex-wrap justify-between items-center">
                <span className="font-bold text-xl text-slate-800">Daftar Personel</span>
                {getLocalUser()?.auth?.permission['binman.create'] && (
                    <div>
                        <Button className="bg-red-800 text-white cursor-pointer" onClick={() => navigation('/personil/create')}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M12 5l0 14"></path>
                                <path d="M5 12l14 0"></path>
                            </svg>
                            Tambah Personel
                        </Button>
                    </div>
                )}
            </div>
            <div className="my-3 flex flex-wrap gap-2">
                {sumberPa.map((item, index) => {
                    return (
                        <Button key={index} className={`${item.isActive ? 'bg-slate-600 text-white' : 'bg-white text-slate-900'} border`} onClick={() => onTabSwitch(index)}>
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
                            <InputSearch placeholder="Cari..." className="shadow-none" onChange={(value) => onSearch(value)} />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        {Object.keys(personil).length === 0 ? <TableLoader /> : personil.data.length === 0 ? <EmptyData /> : renderTable()}
                    </div>
                    <div className="flex justify-end px-5 py-3">
                        {Object.keys(personil).length !== 0 && personil.data.length !== 0 && <SimplePagination pages={personil?.links ?? []} currentPage={personil?.current_page} onCallback={((page) => onNextPage({ page: page }))} />}
                    </div>
                </Card>
            </div>
        </Content>
    );
}
export default PersonilPage;