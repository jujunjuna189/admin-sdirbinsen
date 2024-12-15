import { Button, Card } from "../../../../components";
import { UseSiapsatSatgasContext } from "../../../../contexts/siapsat/SiapsatSatgasContext";

const SiapsatSatgasSaatIniPage = () => {
    const { navigation, location, menu, siapsat } = UseSiapsatSatgasContext();
    return (
        <Card className="grow p-5 overflow-auto h-full">
            <div className="flex flex-wrap justify-between items-center">
                <div className="flex flex-col leading-3">
                    <span className="font-bold text-xl text-slate-800">Data Satgas Saat Ini</span>
                </div>
                <div>
                    {!siapsat?.[menu.title]?.description && (
                        <Button className="bg-red-800 text-white cursor-pointer" onClick={() => navigation(`/siapsat/create`, { state: { ...location.state, sub_category: 'Data Satgas Saat Ini' } })}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path d="M12 5l0 14"></path>
                                <path d="M5 12l14 0"></path>
                            </svg>
                            Tambah
                        </Button>
                    )}
                    {siapsat?.[menu.title]?.description && (
                        <Button className="border py-[0.2rem] bg-yellow-50 border-yellow-800 text-yellow-800" onClick={() => navigation(`/siapsat/update/${siapsat?.[menu.title]?.id}`, { state: { ...location.state, sub_category: 'Data Satgas Saat Ini' } })}>
                            Ubah
                        </Button>
                    )}
                </div>
            </div>
            <div className="mt-5">
                {siapsat?.[menu.title]?.description ?? 'Tidak ada data satgas saat ini'}
            </div>
        </Card>
    );
};

export default SiapsatSatgasSaatIniPage;
