import { Button } from "../../../../components";
import { dateFormatterV4 } from "../../../../utils";

const DetailModal = ({ item, categoryActive, onViewDocument, onClose }) => {
    if (!item) return null;

    const isTaktikPengamanan = ["taktik", "pengamanan"].includes(categoryActive?.key);
    const isMunisiBP = ["munisi-bp"].includes(categoryActive?.key);

    return (
        <div className="fixed bottom-0 top-0 left-0 right-0 flex justify-center items-center z-10">
            <div className="absolute h-full w-full bg-black opacity-30" onClick={onClose} />
            <div className="p-5 border rounded-lg bg-white w-[600px] max-h-[80vh] overflow-y-auto z-10">
                <div className="flex justify-between items-center mb-4">
                    <div className="leading-3">
                        <span className="text-lg font-bold text-slate-800">Detail Materiel</span><br />
                        <small className="text-slate-500">Informasi lengkap materiel</small>
                    </div>
                    <button
                        className="text-slate-500 hover:text-slate-700 p-1"
                        onClick={onClose}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M18 6l-12 12"></path>
                            <path d="M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <div className="border-t border-slate-200 pt-4">
                    {/* Image */}
                    {!isTaktikPengamanan && item.file && (
                        <div className="mb-4 flex justify-center">
                            <img src={item.file} alt="IMG-material" className="max-h-48 object-contain rounded-lg border border-slate-200" />
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        {/* Nama / Judul */}
                        <div className="col-span-2">
                            <label className="text-sm font-medium text-slate-500">{isTaktikPengamanan ? "Judul" : "Nama"}</label>
                            <p className="text-slate-800 font-semibold">{item.nama || "-"}</p>
                        </div>

                        {/* Kategori */}
                        {!isTaktikPengamanan && (
                            <div>
                                <label className="text-sm font-medium text-slate-500">Kategori</label>
                                <p className="text-slate-800">{item.kategori || "-"}</p>
                            </div>
                        )}

                        {/* Komponen/Jenis */}
                        {!isTaktikPengamanan && (
                            <div>
                                <label className="text-sm font-medium text-slate-500">Komponen</label>
                                <p className="text-slate-800">{item.jenis || "-"}</p>
                            </div>
                        )}

                        {/* Kondisi */}
                        {!isTaktikPengamanan && (
                            <div>
                                <label className="text-sm font-medium text-slate-500">Kondisi</label>
                                <p className="text-slate-800">{item.kondisi || "-"}</p>
                            </div>
                        )}

                        {/* Jumlah */}
                        {!isTaktikPengamanan && (
                            <div>
                                <label className="text-sm font-medium text-slate-500">Jumlah</label>
                                <p className="text-slate-800">{item.jumlah || "-"}</p>
                            </div>
                        )}

                        {/* Satuan */}
                        <div>
                            <label className="text-sm font-medium text-slate-500">Satuan</label>
                            <p className="text-slate-800">{item.satuan?.nama || "-"}</p>
                        </div>

                        {/* No Reg */}
                        {!isTaktikPengamanan && (
                            <div>
                                <label className="text-sm font-medium text-slate-500">No Reg</label>
                                <p className="text-slate-800">{item.no_reg || "-"}</p>
                            </div>
                        )}

                        {/* Lokasi */}
                        {isMunisiBP && (
                            <div>
                                <label className="text-sm font-medium text-slate-500">Lokasi</label>
                                <p className="text-slate-800">{item.lokasi || "-"}</p>
                            </div>
                        )}

                        {/* Keterangan */}
                        <div className="col-span-2">
                            <label className="text-sm font-medium text-slate-500">Keterangan</label>
                            <p className="text-slate-800">{item.keterangan || "-"}</p>
                        </div>

                        {/* Document File */}
                        <div className="col-span-2">
                            <label className="text-sm font-medium text-slate-500">Lampiran</label>
                            <div>
                                {item?.document_file && (
                                    <button
                                        className="w-full px-4 py-2 text-left bg-blue-50 text-sm hover:bg-slate-50 flex items-center gap-2 text-blue-700 whitespace-pre"
                                        onClick={() => onViewDocument(item.document_file)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                            <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                                            <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path>
                                            <path d="M9 9l1 0"></path>
                                            <path d="M9 13l6 0"></path>
                                            <path d="M9 17l6 0"></path>
                                        </svg>
                                        Lihat Dokumen
                                    </button>
                                )}

                                {!item?.document_file && (
                                    <p className="text-slate-800">Tidak ada dokumen yang dilampirkan</p>
                                )}
                            </div>
                        </div>

                        {/* Dibuat */}
                        <div>
                            <label className="text-sm font-medium text-slate-500">Dibuat</label>
                            <p className="text-slate-800">{dateFormatterV4(item.created_at)}</p>
                        </div>

                        {/* Diperbarui */}
                        <div>
                            <label className="text-sm font-medium text-slate-500">Diperbarui</label>
                            <p className="text-slate-800">{dateFormatterV4(item.updated_at)}</p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end mt-5 pt-4 border-t border-slate-200">
                    <Button className="border bg-slate-100 hover:bg-slate-200" onClick={onClose}>
                        Tutup
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default DetailModal;
