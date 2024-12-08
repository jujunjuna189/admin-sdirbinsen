import { Button, Card, Content, EmptyData, TableLoader, } from "../../components";
import { UseAnnouncementContext } from "../../contexts/announcement/AnnouncementContext";

const AnnouncementPage = () => {
    const { navigation, element, announcement, onShowConfirmDelete } = UseAnnouncementContext();

    const renderTable = () => {
        return (
            <table className="w-full border-collapse">
                <thead className="bg-slate-50">
                    <tr>
                        <th className="border-b-[1.5px] border-slate-200 px-3 py-2 text-start">No</th>
                        <th className="border-b-[1.5px] border-slate-200 px-3 py-2 text-start">Pengumuman</th>
                        <th className="border-b-[1.5px] border-slate-200 pl-3 pr-5 py-2"></th>
                    </tr>
                </thead>
                <tbody>
                    {announcement?.data?.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td className="border-b-[1.5px] border-slate-200 px-3 py-2">{index + 1}</td>
                                <td className="border-b-[1.5px] border-slate-200 px-3 py-2">{item.message}</td>
                                <td className="border-b-[1.5px] border-slate-200 pl-3 pr-5 py-2">
                                    <div className="flex gap-3 justify-end">
                                        {/* {getLocalUser()?.auth?.permission["announcement.update"] && ( */}
                                        <Button className="border py-[0.2rem] bg-yellow-50 border-yellow-800 text-yellow-800" onClick={() => navigation(`/announcement/update/${item.id}`)}>
                                            Ubah
                                        </Button>
                                        {/* )} */}
                                        {/* {getLocalUser()?.auth?.permission["announcement.delete"] && ( */}
                                        <Button className="border py-[0.2rem] bg-red-50 border-red-800 text-red-800" onClick={() => onShowConfirmDelete(item.id)}>
                                            Hapus
                                        </Button>
                                        {/* )} */}
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
                <span className="font-bold text-xl text-slate-800">Daftar Pengumuman</span>
                <div>
                    <Button className="bg-red-800 text-white cursor-pointer" onClick={() => navigation(`/announcement/create`)}>
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
                    <div className="overflow-x-auto">{Object.keys(announcement).length === 0 ? <TableLoader /> : announcement.data.length === 0 ? <EmptyData /> : renderTable()}</div>
                    <div className="flex justify-end px-5 py-3">
                        <span className="font-semibold text-sm">Rows per page: 10</span>
                    </div>
                </Card>
            </div>
        </Content>
    );
};

export default AnnouncementPage;
