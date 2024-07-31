import { Card } from "../../../components";
import { UsePersonilDetailContext } from "../../../contexts/personil/PersonilDetailContext";

const PersonilDetailRhPage = () => {
    const { personil } = UsePersonilDetailContext();
    return (
        <div className="flex justify-center py-4 print-no-padding">
            <Card className="px-4 print:px-0 pb-10 print:0 pt-14 print:pt-0 text-[12px] w-full max-w-[49.625rem] print-no-border">
                <div className="mb-3 text-center print-no-margin">
                    <span className="font-bold underline text-[14px]">RIWAYAT HIDUP SINGKAT</span>
                </div>
                <span className="font-semibold">I. DATA POKOK</span>
                <div className="flex gap-2">
                    <div className="w-[11rem] h-[11.51rem] border overflow-hidden">
                        <img src={personil?.picture} alt={personil?.nama} className="w-full h-full object-cover" />
                    </div>
                    <table className="w-full">
                        <tbody>
                            <tr>
                                <td className="border border-stone-400 text-end px-2 py-0 font-semibold whitespace-pre">Nama :</td>
                                <td className="border border-stone-400 text-start px-2 py-0">{personil?.nama}</td>
                                <td className="border border-stone-400 text-end px-2 py-0 font-semibold whitespace-pre">Agama :</td>
                                <td className="border border-stone-400 text-start px-2 py-0">{personil?.agama}</td>
                            </tr>
                            <tr>
                                <td className="border border-stone-400 text-end px-2 py-0 font-semibold whitespace-pre">Pangkat :</td>
                                <td className="border border-stone-400 text-start px-2 py-0">{personil?.pangkat}</td>
                                <td className="border border-stone-400 text-end px-2 py-0 font-semibold whitespace-pre">Gol Darah :</td>
                                <td className="border border-stone-400 text-start px-2 py-0">{personil?.golongan_darah}</td>
                            </tr>
                            <tr>
                                <td className="border border-stone-400 text-end px-2 py-0 font-semibold whitespace-pre">NRP :</td>
                                <td className="border border-stone-400 text-start px-2 py-0">{personil?.nrp}</td>
                                <td className="border border-stone-400 text-end px-2 py-0 font-semibold whitespace-pre">Sumber Pa :</td>
                                <td className="border border-stone-400 text-start px-2 py-0">{personil?.sumber_pa}</td>
                            </tr>
                            <tr>
                                <td className="border border-stone-400 text-end px-2 py-0 font-semibold whitespace-pre">Tempat/Tgl.Lahir :</td>
                                <td className="border border-stone-400 text-start px-2 py-0">{personil?.tempat_lahir}, {personil?.tanggal_lahir}</td>
                                <td className="border border-stone-400 text-end px-2 py-0 font-semibold whitespace-pre">TMT :</td>
                                <td className="border border-stone-400 text-start px-2 py-0">{personil?.tmt_1}</td>
                            </tr>
                            <tr>
                                <td className="border border-stone-400 text-end px-2 py-0 font-semibold whitespace-pre">TMT TNI :</td>
                                <td className="border border-stone-400 text-start px-2 py-0">{personil?.tmt_tni}</td>
                                <td className="border border-stone-400 text-end px-2 py-0 font-semibold whitespace-pre">Jabatan :</td>
                                <td className="border border-stone-400 text-start px-2 py-0">{personil?.jabatan}</td>
                            </tr>
                            <tr>
                                <td className="border border-stone-400 text-end px-2 py-0 font-semibold whitespace-pre">Kategori :</td>
                                <td className="border border-stone-400 text-start px-2 py-0">{personil?.status}</td>
                                <td className="border border-stone-400 text-end px-2 py-0 font-semibold whitespace-pre">TMT Jab :</td>
                                <td className="border border-stone-400 text-start px-2 py-0">{personil?.tmt_jab}</td>
                            </tr>
                            <tr>
                                <td className="border border-stone-400 text-end px-2 py-0 font-semibold whitespace-pre">TMT Pangkat :</td>
                                <td className="border border-stone-400 text-start px-2 py-0">{personil?.pangkats?.[(personil?.pangkats.length - 1)]?.tmt ?? '-'}</td>
                                <td className="border border-stone-400 text-end px-2 py-0 font-semibold whitespace-pre">Satuan :</td>
                                <td className="border border-stone-400 text-start px-2 py-0">{personil?.satuan?.nama}</td>
                            </tr>
                            <tr>
                                <td className="border border-stone-400 text-end px-2 py-0 font-semibold whitespace-pre">Suku Bangsa :</td>
                                <td className="border border-stone-400 text-start px-2 py-0">{personil?.suku_bangsa}</td>
                                <td className="border border-stone-400 text-end px-2 py-0 font-semibold whitespace-pre">Psi :</td>
                                <td className="border border-stone-400 text-start px-2 py-0">{personil?.psi}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="mt-3 break-inside-avoid">
                    <span className="font-semibold">II. RIWAYAT PENDIDIKAN</span>
                    <div className="text-center underline font-semibold">PENDIDIKAN UMUM</div>
                </div>
                <table className="w-full mt-2">
                    <thead>
                        <tr>
                            <th className="border border-stone-400 px-2 font-semibold text-center w-8 min-w-8 max-w-8">No</th>
                            <th className="border border-stone-400 px-2 font-semibold text-center">Jenis Pendidikan</th>
                            <th className="border border-stone-400 px-2 font-semibold text-center w-16 min-w-16 max-w-16">Tahun</th>
                            <th className="border border-stone-400 px-2 font-semibold text-center">Dikbangspes/Dikjab/Dik Ilpengtek</th>
                            <th className="border border-stone-400 px-2 font-semibold text-center  w-20 min-w-20 max-w-20">Prestasi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(() => {
                            let components = [];
                            for (let i = 0; i < 5; i++) {
                                components.push(
                                    <tr key={i}>
                                        <td className="border border-stone-400 px-2 font-semibold text-center">{i + 1}</td>
                                        <td className="border border-stone-400 px-2">{personil?.pendidikan_umum?.[i]?.jenis_pendidikan}</td>
                                        <td className="border border-stone-400 px-2 text-center">{personil?.pendidikan_umum?.[i]?.tahun}</td>
                                        <td className="border border-stone-400 px-2">{personil?.pendidikan_umum?.[i]?.nama_pendidikan}</td>
                                        <td className="border border-stone-400 px-2 text-center text-[9px]">{personil?.pendidikan_umum?.[i]?.prestasi}</td>
                                    </tr>
                                );
                            }
                            return components;
                        })()}
                    </tbody>
                </table>
                <div className="mt-3 break-inside-avoid">
                    <div className="text-center underline font-semibold">PENDIDIKAN MILITER</div>
                </div>
                <table className="w-full mt-2">
                    <thead>
                        <tr>
                            <td className="border border-stone-400 px-2 font-semibold text-center w-8 min-w-8 max-w-8">No</td>
                            <td className="border border-stone-400 px-2 font-semibold text-center">Jenis Pendidikan</td>
                            <td className="border border-stone-400 px-2 font-semibold text-center w-16 min-w-16 max-w-16">Tahun</td>
                            <td className="border border-stone-400 px-2 font-semibold text-center  w-20 min-w-20 max-w-20">Prestasi</td>
                            <td className="border border-stone-400 px-2 font-semibold text-center w-8 min-w-8 max-w-8">No</td>
                            <td className="border border-stone-400 px-2 font-semibold text-center">Dikbangspes/Dikjab/Dik Ilpengtek</td>
                            <td className="border border-stone-400 px-2 font-semibold text-center w-16 min-w-16 max-w-16">Tahun</td>
                            <td className="border border-stone-400 px-2 font-semibold text-center  w-20 min-w-20 max-w-20">Prestasi</td>
                        </tr>
                    </thead>
                    <tbody>
                        {(() => {
                            let components = [];
                            for (let i = 0; i < 10; i++) {
                                components.push(
                                    <tr key={i}>
                                        <td className="border border-stone-400 px-2 font-semibold text-center">{i + 1}</td>
                                        <td className="border border-stone-400 px-2">{personil?.pendidikan_militer?.[i]?.dikma_diktuk_dibangun}</td>
                                        <td className="border border-stone-400 px-2 text-center">{personil?.pendidikan_militer?.[i]?.tahun}</td>
                                        <td className="border border-stone-400 px-2 text-center text-[9px]">{personil?.pendidikan_militer?.[i]?.prestasi}</td>
                                        <td className="border border-stone-400 px-2 font-semibold text-center">{i + 1}</td>
                                        <td className="border border-stone-400 px-2 font-semibold text-center"></td>
                                        <td className="border border-stone-400 px-2 font-semibold text-center"></td>
                                        <td className="border border-stone-400 px-2 font-semibold text-center"></td>
                                    </tr>
                                );
                            }
                            return components;
                        })()}
                    </tbody>
                </table>
                <div className="flex gap-3 mt-3 break-inside-avoid">
                    <div className="grow">
                        <div className="flex">
                            <div className="grow">
                                <span className="font-semibold">II. RIWAYAT PENUGASAN OPERASI</span>
                            </div>
                            <div className="pr-24">
                                <span className="font-semibold">III. RIWAYAT TANDA JASA</span>
                            </div>
                            <div className="pr-7">
                                <span className="font-semibold">V. KEMAMPUAN BAHASA</span>
                            </div>
                        </div>
                        <table className="w-full mt-2">
                            <thead>
                                <tr>
                                    <td className="border border-stone-400 px-2 font-semibold text-center w-8 min-w-8 max-w-8">No</td>
                                    <td className="border border-stone-400 px-2 font-semibold text-center w-40 min-w-40 max-w-40">Nama Operasi</td>
                                    <td className="border border-stone-400 px-2 font-semibold text-center w-16 min-w-16 max-w-16">Tahun</td>
                                    <td className="border border-stone-400 px-2 font-semibold text-center w-20 min-w-20 max-w-20">Prestasi</td>
                                    <td className="border border-stone-400 px-2 font-semibold text-center w-8 min-w-8 max-w-8">No</td>
                                    <td className="border border-stone-400 px-2 font-semibold text-center w-52 min-w-52 max-w-52">Tanda Kehormatan</td>
                                    <td className="border border-stone-400 px-2 font-semibold text-center w-8 min-w-8 max-w-8">No</td>
                                    <td className="border border-stone-400 px-2 font-semibold text-center w-20 min-w-20 max-w-20" colSpan={2}>Daerah</td>
                                </tr>
                            </thead>
                            <tbody>
                                {(() => {
                                    let components = [];
                                    for (let i = 0; i < 10; i++) {
                                        components.push(
                                            <tr key={i}>
                                                <td className="border border-stone-400 px-2 font-semibold text-center">{i + 1}</td>
                                                <td className="border border-stone-400 px-2">{personil?.penugasan_operasi?.[i]?.nama_operasi}</td>
                                                <td className="border border-stone-400 px-2 text-center">{personil?.penugasan_operasi?.[i]?.tahun}</td>
                                                <td className="border border-stone-400 px-2 text-center text-[9px]">{personil?.penugasan_operasi?.[i]?.prestasi}</td>
                                                <td className="border border-stone-400 px-2 font-semibold text-center">{i + 1}</td>
                                                <td className="border border-stone-400 px-2">{personil?.tanda_jasa?.[i]?.tanda_kehormatan}</td>
                                                {i !== 5 ? <td className="border border-stone-400 px-2 font-semibold text-center">{(i + 1) > 5 ? (i - 5) : (i + 1)}</td> : <td className="border border-stone-400 px-2 font-semibold text-center">No</td>}
                                                {i !== 5 ? <td className="border border-stone-400 px-2 text-center">{(i + 1) > 5 ? personil?.kemampuan_bahasa?.filter(item => item.jenis_bahasa === "Asing")?.[(i - 6)]?.nama : personil?.kemampuan_bahasa?.filter(item => item.jenis_bahasa === "Daerah")?.[i]?.nama}</td> : <td className="border border-stone-400 px-2 font-semibold text-center" colSpan={2}>Asing</td>}
                                                {i !== 5 && <td className="border border-stone-400 px-2 text-center">{(i + 1) > 5 ? personil?.kemampuan_bahasa?.filter(item => item.jenis_bahasa === "Asing")?.[(i - 6)]?.status : personil?.kemampuan_bahasa?.filter(item => item.jenis_bahasa === "Daerah")?.[i]?.status}</td>}
                                            </tr>
                                        );
                                    }
                                    return components;
                                })()}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="flex gap-3 mt-3 break-inside-avoid">
                    <div className="grow">
                        <div className="flex">
                            <div className="grow">
                                <span className="font-semibold">VI. RIWAYAT KEPANGKATAN</span>
                            </div>
                            <div className="grow">
                                <span className="font-semibold">VII. RIWAYAT PENUGASAN LUAR NEGERI</span>
                            </div>
                        </div>
                        <table className="w-full mt-2">
                            <thead>
                                <tr>
                                    <td className="border border-stone-400 px-2 font-semibold text-center w-8 min-w-8 max-w-8">No</td>
                                    <td className="border border-stone-400 px-2 font-semibold text-center">Pangkat</td>
                                    <td className="border border-stone-400 px-2 font-semibold text-center w-20 min-w-20 max-w-20">TMT</td>
                                    <td className="border border-stone-400 px-2 font-semibold text-center w-32 min-w-32 max-w-32">Nomor Kep/Skep</td>
                                    <td className="border border-stone-400 px-2 font-semibold text-center w-8 min-w-8 max-w-8">No</td>
                                    <td className="border border-stone-400 px-2 font-semibold text-center">Macam Tugas</td>
                                    <td className="border border-stone-400 px-2 font-semibold text-center w-16 min-w-16 max-w-16">Tahun</td>
                                    <td className="border border-stone-400 px-2 font-semibold text-center w-20 min-w-20 max-w-20">Negara</td>
                                    <td className="border border-stone-400 px-2 font-semibold text-center w-20 min-w-20 max-w-20">Prestasi</td>
                                </tr>
                            </thead>
                            <tbody>
                                {(() => {
                                    let components = [];
                                    for (let i = 0; i < 10; i++) {
                                        components.push(
                                            <tr key={i}>
                                                <td className="border border-stone-400 px-2 font-semibold text-center">{i + 1}</td>
                                                <td className="border border-stone-400 px-2">{personil?.pangkats?.[i]?.pangkat}</td>
                                                <td className="border border-stone-400 px-2 text-center text-[10px]">{personil?.pangkats?.[i]?.tmt}</td>
                                                <td className="border border-stone-400 px-2">{personil?.pangkats?.[i]?.nomor_kep_skep}</td>
                                                <td className="border border-stone-400 px-2 font-semibold text-center">{i + 1}</td>
                                                <td className="border border-stone-400 px-2">{personil?.penugasan_luar_negeri?.[i]?.macam_tugas}</td>
                                                <td className="border border-stone-400 px-2 text-center">{personil?.penugasan_luar_negeri?.[i]?.tahun}</td>
                                                <td className="border border-stone-400 px-2 text-center">{personil?.penugasan_luar_negeri?.[i]?.negara}</td>
                                                <td className="border border-stone-400 px-2 text-center text-[9px]">{personil?.penugasan_luar_negeri?.[i]?.prestasi}</td>
                                            </tr>
                                        );
                                    }
                                    return components;
                                })()}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="break-inside-avoid">
                    <div className="mt-3">
                        <div className="underline font-semibold">VIII. RIWAYAT JABATAN</div>
                    </div>
                    <table className="w-full mt-2">
                        <thead>
                            <tr>
                                <td className="border border-stone-400 px-2 font-semibold text-center w-8 min-w-8 max-w-8">No</td>
                                <td className="border border-stone-400 px-2 font-semibold text-center w-72 min-w-72 max-w-72">Jabatan</td>
                                <td className="border border-stone-400 px-2 font-semibold text-center w-20 min-w-20 max-w-20">TMT</td>
                                <td className="border border-stone-400 px-2 font-semibold text-center w-8 min-w-8 max-w-8">No</td>
                                <td className="border border-stone-400 px-2 font-semibold text-center">Jabatan</td>
                                <td className="border border-stone-400 px-2 font-semibold text-center w-20 min-w-20 max-w-20">TMT</td>
                            </tr>
                        </thead>
                        <tbody>
                            {(() => {
                                let components = [];
                                for (let i = 0; i < 10; i++) {
                                    components.push(
                                        <tr key={i}>
                                            <td className="border border-stone-400 px-2 font-semibold text-center">{i + 1}</td>
                                            <td className="border border-stone-400 px-2">{personil?.jabatans?.[i]?.jabatan}</td>
                                            <td className="border border-stone-400 px-2 text-center text-[9px]">{personil?.jabatans?.[i]?.tmt}</td>
                                            <td className="border border-stone-400 px-2 font-semibold text-center">{i + 11}</td>
                                            <td className="border border-stone-400 px-2">{personil?.jabatans?.[i + 10]?.jabatan}</td>
                                            <td className="border border-stone-400 px-2 text-center text-[9px]">{personil?.jabatans?.[i + 10]?.tmt}</td>
                                        </tr>
                                    );
                                }
                                return components;
                            })()}
                        </tbody>
                    </table>
                </div>
                <div className="break-inside-avoid">
                    <div className="mt-3">
                        <div className="underline font-semibold">IX. RIWAYAT KELUARGA</div>
                    </div>
                    <div className="flex gap-3 mt-2">
                        <table className="grow">
                            <tbody>
                                <tr>
                                    <td className="border border-stone-400 text-end px-2 py-0 font-semibold whitespace-pre w-36">Status :</td>
                                    <td className="border border-stone-400 text-start px-2 py-0">{personil?.keluarga?.status}</td>
                                </tr>
                                <tr>
                                    <td className="border border-stone-400 text-end px-2 py-0 font-semibold whitespace-pre w-36">Jml Anak :</td>
                                    <td className="border border-stone-400 text-start px-2 py-0">{personil?.keluarga?.jumlah_anak}</td>
                                </tr>
                                <tr>
                                    <td className="border border-stone-400 text-end px-2 py-0 font-semibold whitespace-pre w-36">Alamat Tinggal :</td>
                                    <td className="border border-stone-400 text-start px-2 py-0">{personil?.keluarga?.alamat_tinggal}</td>
                                </tr>
                                <tr>
                                    <td className="border border-stone-400 text-end px-2 py-0 font-semibold whitespace-pre w-36">Nomor HP :</td>
                                    <td className="border border-stone-400 text-start px-2 py-0">{personil?.keluarga?.nomor_hp}</td>
                                </tr>
                                <tr>
                                    <td className="border border-stone-400 text-end px-2 py-0 font-semibold whitespace-pre w-36">Nama Ayah :</td>
                                    <td className="border border-stone-400 text-start px-2 py-0">{personil?.keluarga?.nama_ayah}</td>
                                </tr>
                                <tr>
                                    <td className="border border-stone-400 text-end px-2 py-0 font-semibold whitespace-pre w-36">Nama Ibu :</td>
                                    <td className="border border-stone-400 text-start px-2 py-0">{personil?.keluarga?.nama_ibu}</td>
                                </tr>
                                <tr>
                                    <td className="border border-stone-400 text-end px-2 py-0 font-semibold whitespace-pre w-36">Alamat Orang Tua :</td>
                                    <td className="border border-stone-400 text-start px-2 py-0">{personil?.keluarga?.alamat_orang_tua}</td>
                                </tr>
                                <tr>
                                    <td className="border border-stone-400 text-end px-2 py-0 font-semibold whitespace-pre w-36">Nama Istri/Suami :</td>
                                    <td className="border border-stone-400 text-start px-2 py-0">{personil?.keluarga?.nama_istri_atau_suami}</td>
                                </tr>
                            </tbody>
                        </table>
                        <table className="grow">
                            <thead>
                                <tr>
                                    <td className="border border-stone-400 px-2 font-semibold text-center w-8 min-w-8 max-w-8">No</td>
                                    <td className="border border-stone-400 px-2 font-semibold text-center">Nama Anak</td>
                                    <td className="border border-stone-400 px-2 font-semibold text-center w-24 min-w-24 max-w-24">Tgl Lahir</td>
                                </tr>
                            </thead>
                            <tbody>
                                {(() => {
                                    let components = [];
                                    for (let i = 0; i < 8; i++) {
                                        components.push(
                                            <tr key={i}>
                                                <td className="border border-stone-400 px-2 font-semibold text-center">{i + 1}</td>
                                                <td className="border border-stone-400 px-2">{personil?.riwayat_keluarga_anak?.[i]?.nama}</td>
                                                <td className="border border-stone-400 px-2 text-center">{personil?.riwayat_keluarga_anak?.[i]?.tanggal_lahir}</td>
                                            </tr>
                                        );
                                    }
                                    return components;
                                })()}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="break-inside-avoid">
                    <div className="mt-3">
                        <div className="underline font-semibold">X. RIWAYAT PRESTASI</div>
                    </div>
                    <table className="w-full mt-2">
                        <tbody>
                            <tr>
                                <td className="border border-stone-400 px-2 font-semibold text-center w-8 min-w-8 max-w-8">No</td>
                                <td className="border border-stone-400 px-2 font-semibold text-center">Jabatan</td>
                                <td className="border border-stone-400 px-2 font-semibold text-center">TMT</td>
                                <td className="border border-stone-400 px-2 font-semibold text-center w-8 min-w-8 max-w-8">No</td>
                                <td className="border border-stone-400 px-2 font-semibold text-center">Jabatan</td>
                                <td className="border border-stone-400 px-2 font-semibold text-center">TMT</td>
                            </tr>
                            <tr>
                                <td className="border border-stone-400 px-2 font-semibold text-center">1</td>
                                <td className="border border-stone-400 px-2 font-semibold text-center"></td>
                                <td className="border border-stone-400 px-2 font-semibold text-center"></td>
                                <td className="border border-stone-400 px-2 font-semibold text-center">7</td>
                                <td className="border border-stone-400 px-2 font-semibold text-center"></td>
                                <td className="border border-stone-400 px-2 font-semibold text-center"></td>
                            </tr>
                            <tr>
                                <td className="border border-stone-400 px-2 font-semibold text-center">2</td>
                                <td className="border border-stone-400 px-2 font-semibold text-center"></td>
                                <td className="border border-stone-400 px-2 font-semibold text-center"></td>
                                <td className="border border-stone-400 px-2 font-semibold text-center">8</td>
                                <td className="border border-stone-400 px-2 font-semibold text-center"></td>
                                <td className="border border-stone-400 px-2 font-semibold text-center"></td>
                            </tr>
                            <tr>
                                <td className="border border-stone-400 px-2 font-semibold text-center">3</td>
                                <td className="border border-stone-400 px-2 font-semibold text-center"></td>
                                <td className="border border-stone-400 px-2 font-semibold text-center"></td>
                                <td className="border border-stone-400 px-2 font-semibold text-center">9</td>
                                <td className="border border-stone-400 px-2 font-semibold text-center"></td>
                                <td className="border border-stone-400 px-2 font-semibold text-center"></td>
                            </tr>
                            <tr>
                                <td className="border border-stone-400 px-2 font-semibold text-center">4</td>
                                <td className="border border-stone-400 px-2 font-semibold text-center"></td>
                                <td className="border border-stone-400 px-2 font-semibold text-center"></td>
                                <td className="border border-stone-400 px-2 font-semibold text-center">10</td>
                                <td className="border border-stone-400 px-2 font-semibold text-center"></td>
                                <td className="border border-stone-400 px-2 font-semibold text-center"></td>
                            </tr>
                            <tr>
                                <td className="border border-stone-400 px-2 font-semibold text-center">5</td>
                                <td className="border border-stone-400 px-2 font-semibold text-center"></td>
                                <td className="border border-stone-400 px-2 font-semibold text-center"></td>
                                <td className="border border-stone-400 px-2 font-semibold text-center">11</td>
                                <td className="border border-stone-400 px-2 font-semibold text-center"></td>
                                <td className="border border-stone-400 px-2 font-semibold text-center"></td>
                            </tr>
                            <tr>
                                <td className="border border-stone-400 px-2 font-semibold text-center">6</td>
                                <td className="border border-stone-400 px-2 font-semibold text-center"></td>
                                <td className="border border-stone-400 px-2 font-semibold text-center"></td>
                                <td className="border border-stone-400 px-2 font-semibold text-center">12</td>
                                <td className="border border-stone-400 px-2 font-semibold text-center"></td>
                                <td className="border border-stone-400 px-2 font-semibold text-center"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </Card >
        </div >
    );
}

export default PersonilDetailRhPage;