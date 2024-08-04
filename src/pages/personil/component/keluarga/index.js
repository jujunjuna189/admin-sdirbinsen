import AddKeluargaAnakModal from "./AddKeluargaAnakModal";
import AddKeluargaModal from "./AddKeluargaModal";

const KeluargaPersonilDetail = (props) => {
    return (
        <div>
            <div className="shadow-none p-4 border rounded-lg">
                <div className="mt-2 px-3">
                    <span className="font-semibold">Riwayat Keluarga</span>
                </div>
                <div className="mt-4 px-3 flex flex-col gap-2">
                    <div className="flex">
                        <div className="border border-dashed p-3 rounded-lg inline-flex">
                            <AddKeluargaModal personil_id={props.personil?.id} onSave={() => props.onAdd && props.onAdd()} />
                        </div>
                    </div>
                    {props.keluarga?.data?.map((item, index) => {
                        return (
                            <div key={index} className="border p-4 rounded-lg relative">
                                <div className="flex gap-5">
                                    <span className="text-base font-bold">Profil Keluarga</span>
                                    <div className="flex gap-2">
                                        <div className="border p-1 rounded-md cursor-pointer bg-yellow-50 border-yellow-700 text-yellow-700">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4"></path>
                                                <path d="M13.5 6.5l4 4"></path>
                                            </svg>
                                        </div>
                                        <div className="border p-1 rounded-md cursor-pointer bg-red-50 border-red-700 text-red-700" onClick={() => props.onShowConfirmDelete && props.onShowConfirmDelete(item.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                <path d="M4 7l16 0"></path>
                                                <path d="M10 11l0 6"></path>
                                                <path d="M14 11l0 6"></path>
                                                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                                                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <table className="mt-5">
                                    <tbody>
                                        <tr>
                                            <td className="py-[7px]"><span className="font-medium">Nama Ibu</span></td>
                                            <td className="py-[7px]"><span className="px-4">: {item.nama_ibu}</span></td>
                                        </tr>
                                        <tr>
                                            <td className="py-[7px]"><span className="font-medium">Nama Ayah</span></td>
                                            <td className="py-[7px]"><span className="px-4">: {item.nama_ayah}</span></td>
                                        </tr>
                                        <tr>
                                            <td className="py-[7px]"><span className="font-medium">Nama Istri/Suami</span></td>
                                            <td className="py-[7px]"><span className="px-4">: {item.nama_istri_atau_suami}</span></td>
                                        </tr>
                                        <tr>
                                            <td className="py-[7px]"><span className="font-medium">Alamat Tinggal</span></td>
                                            <td className="py-[7px]"><span className="px-4">: {item.alamat_tinggal}</span></td>
                                        </tr>
                                        <tr>
                                            <td className="py-[7px]"><span className="font-medium">Alamat Orang Tua</span></td>
                                            <td className="py-[7px]"><span className="px-4">: {item.alamat_orang_tua}</span></td>
                                        </tr>
                                        <tr>
                                            <td className="py-[7px]"><span className="font-medium">Nomor Hp</span></td>
                                            <td className="py-[7px]"><span className="px-4">: {item.nomor_hp}</span></td>
                                        </tr>
                                        <tr>
                                            <td className="py-[7px]"><span className="font-medium">Jumlah Anak</span></td>
                                            <td className="py-[7px]"><span className="px-4">: {item.jumlah_anak}</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="mt-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-base font-bold">Data Anak</span>
                                        <div className="border border-dashed px-3 py-2 rounded-lg inline-flex">
                                            <AddKeluargaAnakModal personil_id={props.personil?.id} keluarga_id={item.id} onSave={() => props.onAdd && props.onAdd()} />
                                        </div>
                                    </div>
                                    <table className="mt-3 w-full">
                                        <thead>
                                            <tr>
                                                <th className="border py-1 w-8 min-w-8 max-w-8">No</th>
                                                <th className="border py-1 text-start px-2">Nama Anak</th>
                                                <th className="border py-1 w-36 min-w-36 max-w-36">Tgl Lahir</th>
                                                <th className="border py-1 w-24 min-w-24 max-w-24">Aksi</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {item?.keluarga_anak.length === 0 && (
                                                <tr>
                                                    <td className="border text-center py-2" colSpan={4}>Tidak ada data</td>
                                                </tr>
                                            )}
                                            {item?.keluarga_anak?.map((item, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td className="border py-1 text-center">{index + 1}</td>
                                                        <td className="border py-1 px-2">{item.nama}</td>
                                                        <td className="border py-1 text-center">{item.tanggal_lahir}</td>
                                                        <td className="border py-1 text-center">
                                                            <div className="flex gap-1 justify-center">
                                                                <div className="border p-1 rounded-md cursor-pointer bg-yellow-50 border-yellow-700 text-yellow-700">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                                        <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4"></path>
                                                                        <path d="M13.5 6.5l4 4"></path>
                                                                    </svg>
                                                                </div>
                                                                <div className="border p-1 rounded-md cursor-pointer bg-red-50 border-red-700 text-red-700" onClick={() => { }}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                                        <path d="M4 7l16 0"></path>
                                                                        <path d="M10 11l0 6"></path>
                                                                        <path d="M14 11l0 6"></path>
                                                                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                                                                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default KeluargaPersonilDetail;