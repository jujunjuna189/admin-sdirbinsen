import { Button, Card, EmptyData, TableLoader } from "../../../../../components";
import AddKorpsModal from "./AddKorpsModal";
import UpdateKorpsModal from "./UpdateKorpsModal";

const KorpsPersonilSetting = (props) => {

    const renderTable = () => {
        return (
            <table className="w-full border-collapse">
                <thead className="bg-slate-50">
                    <tr>
                        <th className="border-b-[1.5px] border-slate-200 pl-5 pr-3 py-2 text-start w-10">
                            No
                        </th>
                        <th className="border-b-[1.5px] border-slate-200 px-3 py-2 text-start">Nama</th>
                        <th className="border-b-[1.5px] border-slate-200 pl-3 pr-5 py-2"></th>
                    </tr>
                </thead>
                <tbody>
                    {props?.korps?.data?.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td className="border-b-[1.5px] border-slate-200 pl-5 pr-3 py-2">
                                    <div className="flex gap-5 items-center">
                                        {index + 1}
                                    </div>
                                </td>
                                <td className="border-b-[1.5px] border-slate-200 px-3 py-2">
                                    {item.nama}
                                </td>
                                <td className="border-b-[1.5px] border-slate-200 pl-3 pr-5 py-2">
                                    <div className="flex gap-3 justify-end">
                                        <UpdateKorpsModal korps={item} onSave={() => props.onUpdate()} />
                                        <Button className="border py-[0.2rem] bg-red-50 border-red-800 text-red-800" onClick={() => props.onShowConfirmDelete && props.onShowConfirmDelete(item.id)}>Hapus</Button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        );
    }
    return (
        <Card>
            <div className="mb-3 px-5 flex justify-between items-center">
                <div className="inline-block">
                    <Button className="border-2 border-slate-100">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M4 4h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414v7l-6 2v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227z"></path>
                        </svg>
                        Filter
                    </Button>
                </div>
                <div className="inline-block">
                    <AddKorpsModal onSave={() => props.onAdd && props.onAdd()} />
                </div>
            </div>
            <div className="overflow-x-auto">
                {Object.keys(props.korps).length === 0 ? <TableLoader /> : props.korps.data.length === 0 ? <EmptyData /> : renderTable()}
            </div>
            <div className="flex justify-end px-5 py-3">
                <span className="font-semibold text-sm">Rows per page: 10</span>
            </div>
        </Card>
    );
}

export default KorpsPersonilSetting;