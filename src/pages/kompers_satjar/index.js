import { Button, Card, Content, EmptyData, TableLoader } from "../../components";
import { UseKompersSatjarContext } from "../../contexts/kompers_satjat/KompersSatjarContext";
import { dateFormatterV4 } from "../../utils";

const KompersSatjarPage = () => {
    const { navigation, kompersSatjarCategory, kompersSatjarCategoryActive, kompersSatjar, onTabSwitch } = UseKompersSatjarContext();

    const renderTable = () => {
        return (
            <table className="w-full border-collapse">
                <thead className="bg-slate-50">
                    <tr>
                        <th className="border-b-[1.5px] border-slate-200 px-3 py-2 text-start w-[1rem] min-w-[1rem] max-w-[1rem]">No.</th>
                        <th className="border-b-[1.5px] border-slate-200 px-3 py-2 text-start">Judul</th>
                        <th className="border-b-[1.5px] border-slate-200 px-3 py-2 text-start">Kategori</th>
                        <th className="border-b-[1.5px] border-slate-200 px-3 py-2 text-start">Dibuat</th>
                        <th className="border-b-[1.5px] border-slate-200 pl-3 pr-5 py-2"></th>
                    </tr>
                </thead>
                <tbody>
                    {kompersSatjar?.data?.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td className="border-b-[1.5px] border-slate-200 px-3 py-2">{index + 1}</td>
                                <td className="border-b-[1.5px] border-slate-200 px-3 py-2">{item.title}</td>
                                <td className="border-b-[1.5px] border-slate-200 px-3 py-2">
                                    <div className="leading-3 flex flex-col">
                                        <span className="font-medium">{item.category}</span>
                                        <small>{item.sub_category}</small>
                                    </div>
                                </td>
                                <td className="border-b-[1.5px] border-slate-200 px-3 py-2">{dateFormatterV4(item.created_at)}</td>
                                <td className="border-b-[1.5px] border-slate-200 px-3 py-2">
                                    <div className="flex gap-3 justify-end">
                                        <Button className="border py-[0.2rem] bg-green-50 border-green-800 text-green-800" onClick={() => navigation(`/personil/kompers_satjar/detail/${item.id}`)}>Detail</Button>
                                        <Button className="border py-[0.2rem] bg-yellow-50 border-yellow-800 text-yellow-800" onClick={() => navigation(`/personil/kompers_satjar/update/${item.id}`)}>Ubah</Button>
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
        <Content>
            <div className="flex flex-wrap justify-between items-center">
                <div className="flex flex-col leading-3">
                    <span className="font-bold text-xl text-slate-800">Kompers Satjar</span>
                    <small>Rekapitulasi</small>
                </div>
                <div className="flex gap-4">
                    <Button className="bg-red-800 text-white cursor-pointer" onClick={() => navigation('/personil/kompers_satjar_category')}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M12 5l0 14"></path>
                            <path d="M5 12l14 0"></path>
                        </svg>
                        Tambah Format
                    </Button>
                    <Button className="bg-red-800 text-white cursor-pointer" onClick={() => navigation(`/personil/kompers_satjar/create/${kompersSatjarCategoryActive.id}`)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M12 5l0 14"></path>
                            <path d="M5 12l14 0"></path>
                        </svg>
                        Tambah
                    </Button>
                </div>
            </div>
            <div className="my-3 flex flex-wrap gap-2">
                {kompersSatjarCategory.map((item, index) => {
                    return (
                        <Button key={index} className={`${item.isActive ? 'bg-slate-600 text-white' : 'bg-white text-slate-900'} border`} onClick={() => onTabSwitch(index)}>
                            <div className="flex flex-col leading-4">
                                {item.category}
                                <small className="font-normal">{item.sub_category}</small>
                            </div>
                        </Button>
                    );
                })}
            </div>
            <div className="mt-2">
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
                    <div className="overflow-x-auto">{Object.keys(kompersSatjar).length === 0 ? <TableLoader /> : kompersSatjar.data.length === 0 ? <EmptyData /> : renderTable()}</div>
                    <div className="flex justify-end px-5 py-3">
                        <span className="font-semibold text-sm">Rows per page: 10</span>
                    </div>
                </Card>
            </div>
        </Content>
    );
}

export default KompersSatjarPage;