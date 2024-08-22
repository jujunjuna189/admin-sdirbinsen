import { Button, Card, Content, EmptyData, TableLoader } from "../../components";
import { UseKompersSatjarContext } from "../../contexts/kompers_satjat/KompersSatjarContext";

const KompersSatjarPage = () => {
    const { kompersSatjar } = UseKompersSatjarContext();

    const renderTable = () => {
        return (
            <table className="w-full border-collapse">
                <thead className="bg-slate-50">
                    <tr>
                        <th className="border-b-[1.5px] border-slate-200 px-3 py-2 text-start">Nama</th>
                        <th className="border-b-[1.5px] border-slate-200 pl-3 pr-5 py-2"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
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
                <div>
                    <Button className="bg-red-800 text-white cursor-pointer" onClick={() => { }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M12 5l0 14"></path>
                            <path d="M5 12l14 0"></path>
                        </svg>
                        Tambah
                    </Button>
                </div>
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