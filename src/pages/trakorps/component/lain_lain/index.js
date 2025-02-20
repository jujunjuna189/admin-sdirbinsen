import { Button, Card } from "../../../../components";
import AddLainLainSatuanModal from "./AddLainLainSatuanModal";
import UpdateLainLainSatuanModal from "./UpdateLainLainSatuanModal";

const LainLainTrakorpsDetail = (props) => {
    return (
        <Card className="px-4">
            <div className="flex justify-between items-center pb-3">
                <span className="font-bold text-base">Data Lain Lain</span>
                <AddLainLainSatuanModal satuan={props.satuan} onSave={() => props.onSave && props.onSave()} />
            </div>
            <hr />
            <div className="my-3">
                {props.satuanLainLain?.data?.map((item, index) => {
                    return (
                        <div key={index} className="flex gap-3 border py-1 px-1 rounded-lg mb-2">
                            {item.gambar && (
                                <div className="h-16 w-16 relative border rounded-lg overflow-hidden">
                                    <img src={item.gambar} alt="ImagePrestasi" className="object-cover w-full h-full" />
                                </div>
                            )}
                            <div className="leading-5 mt-1 grow">
                                <span className="font-semibold text-[16px]">{item.nama}</span>
                                {item.file && (
                                    <div className="flex mt-1">
                                        <span style={{ textDecoration: 'underline', color: 'blue' }} onClick={() => window.open(`https://docs.google.com/gview?url=${item.file}`, '_self')}>
                                            Lihat File
                                        </span>
                                    </div>
                                )}
                                <div className="border-t py-2 px-2">
                                    <span className="font-semibold text-[12px]">Deskripsi</span>
                                    <p>{item.deskripsi}</p>
                                </div>
                            </div>
                            <div className="flex items-start py-2 px-2">
                                <div className="flex gap-2">
                                    <UpdateLainLainSatuanModal item={item} onSave={() => props.onSave && props.onSave()} satuan={props.satuan} />
                                    <Button className="border py-[0.2rem] bg-red-50 border-red-800 text-red-800" onClick={() => props.onDelete && props.onDelete(item.id)}>
                                        Hapus
                                    </Button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
};

export default LainLainTrakorpsDetail;
