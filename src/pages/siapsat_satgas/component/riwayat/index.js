import { Button, Card } from "../../../../components";
import { UseSiapsatSatgasContext } from "../../../../contexts/siapsat/SiapsatSatgasContext";


const SiapsatSatgasRiwayatPage = () => {
    const { navigation, location, menu, satuan, satuanData, siapsat, onChangeTab } = UseSiapsatSatgasContext();
    return (
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
                        {!siapsat?.[menu.title]?.description && (
                            <Button className="bg-red-800 text-white cursor-pointer" onClick={() => navigation(`/siapsat/create`, { state: { ...location.state, satuan_id: satuanData?.id, sub_category: 'Riwayat Satgas' } })}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                    <path d="M12 5l0 14"></path>
                                    <path d="M5 12l14 0"></path>
                                </svg>
                                Tambah
                            </Button>
                        )}
                        {siapsat?.[menu.title]?.description && (
                            <Button className="border py-[0.2rem] bg-yellow-50 border-yellow-800 text-yellow-800" onClick={() => navigation(`/siapsat/update/${siapsat?.[menu.title]?.id}`, { state: { ...location.state, satuan_id: satuanData?.id, sub_category: 'Riwayat Satgas' } })}>
                                Ubah
                            </Button>
                        )}
                    </div>
                </div>
                <div className="mt-5">
                    {siapsat?.[menu.title]?.description ?? 'Tidak ada data riwayat satgas'}
                </div>
            </Card>
        </div>
    );
};

export default SiapsatSatgasRiwayatPage;
