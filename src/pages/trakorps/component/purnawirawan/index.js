import { icSoldier } from "../../../../assets";
import { Button, Card } from "../../../../components";
import AddPurnawirawanSatuanModal from "./AddPurnawirawanSatuanModal";

const PejabatPurnawirawanDetail = (props) => {
    return (
        <Card className="px-4">
            <div className="flex justify-between items-center pb-3">
                <span className="font-bold text-base">Data Purnawirawan</span>
                <AddPurnawirawanSatuanModal satuan={props.satuan} onSave={() => props.onSave && props.onSave()} />
            </div>
            <hr />
            <div className="my-3">
                {props.satuanPurnawirawan?.data?.map((item, index) => {
                    return (
                        <div key={index} className="flex gap-3 border py-1 px-1 rounded-lg mb-2">
                            <div className="h-16 w-16 relative border rounded-lg overflow-hidden mt-1">
                                {!item.gambar && (
                                    <img src={icSoldier} alt="ImagePrestasi" className="object-cover w-full h-full" />
                                )}
                                {item.gambar && (
                                    <img src={item.gambar} alt="ImagePrestasi" className="object-cover w-full h-full" />
                                )}
                            </div>
                            <div className="leading-5 grow">
                                <table>
                                    <thead>
                                        <tr>
                                            <td>
                                                <div className="flex justify-between gap-3">
                                                    <span>Nama Lengkap</span>
                                                    <span>:</span>
                                                </div>
                                            </td>
                                            <td>
                                                <span className="font-semibold text-[14px]">{item.nama}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="flex justify-between gap-3">
                                                    <span>Pangkat</span>
                                                    <span>:</span>
                                                </div>
                                            </td>
                                            <td>{item.pangkat}</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="flex justify-between gap-3">
                                                    <span>Jabatan</span>
                                                    <span>:</span>
                                                </div>
                                            </td>
                                            <td>{item.jabatan}</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="flex justify-between gap-3">
                                                    <span>Leting</span>
                                                    <span>:</span>
                                                </div>
                                            </td>
                                            <td>{item.leting}</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="flex justify-between gap-3">
                                                    <span>HP</span>
                                                    <span>:</span>
                                                </div>
                                            </td>
                                            <td>{item.no_hp}</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="flex justify-between gap-3">
                                                    <span>Alamat</span>
                                                    <span>:</span>
                                                </div>
                                            </td>
                                            <td>{item.alamat}</td>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                            <div className="flex items-start py-2 px-2">
                                <div className="flex gap-2">
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

export default PejabatPurnawirawanDetail;
