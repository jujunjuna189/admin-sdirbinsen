import { useState } from "react";
import { icSoldier } from "../../../../assets";
import { Button, Card, EmptyData, InputSearch, SimplePagination } from "../../../../components";
import AddPurnawirawanSatuanModal from "./AddPurnawirawanSatuanModal";
import UpdatePurnawirawanSatuanModal from "./UpdatePurnawirawanSatuanModal";

const PejabatPurnawirawanDetail = (props) => {
    const [controller, setController] = useState({});

    const onNextPage = ({ page }) => {
        props.onNextPage && props.onNextPage(page);
    }

    const onSetController = ({ field, value }) => {
        onSearch({ value });
        setController({ ...controller, [field]: value });
    }

    const onSearch = ({ value }) => {
        props.onSearch && props.onSearch(value);
    }

    return (
        <Card className="px-4">
            <div className="flex justify-between items-center pb-3">
                <span className="font-bold text-base">Data Purnawirawan</span>
                <AddPurnawirawanSatuanModal satuan={props.satuan} onSave={() => props.onSave && props.onSave()} />
            </div>
            <hr />
            <div className="flex justify-end mt-3">
                <InputSearch value={controller.search} placeholder="Cari..." className="shadow-none" onChange={(value) => onSetController({ field: 'search', value: value })} />
            </div>
            <div className="my-3">
                {(props.satuanPurnawirawan.data?.length === 0) && <EmptyData />}
                {props.satuanPurnawirawan?.data?.map((item, index) => {
                    return (
                        <div key={index} className="flex gap-3 border py-1 px-1 rounded-lg mb-2">
                            <div className="flex gap-2">
                                <div>
                                    <div className="px-2 py-1 font-semibold mt-1 border rounded-md">
                                        {(parseInt(props.satuanPurnawirawan?.from ?? 0)) + index}
                                    </div>
                                </div>
                                <div className="h-16 w-16 relative border rounded-lg overflow-hidden mt-1">
                                    {!item.gambar && (
                                        <img src={icSoldier} alt="ImagePrestasi" className="object-cover w-full h-full" />
                                    )}
                                    {item.gambar && (
                                        <img src={item.gambar} alt="ImagePrestasi" className="object-cover w-full h-full" />
                                    )}
                                </div>
                            </div>
                            <div className="leading-5 grow">
                                <table>
                                    <tbody>
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
                                                    <span>Tmp, Tgl Lahir</span>
                                                    <span>:</span>
                                                </div>
                                            </td>
                                            <td>
                                                <span>{item.tempat_lahir ?? '-'}, {item.tanggal_lahir ?? '-'}</span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="flex justify-between gap-3">
                                                    <span>Agama</span>
                                                    <span>:</span>
                                                </div>
                                            </td>
                                            <td>{item.agama}</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="flex justify-between gap-3">
                                                    <span>Suku Bangsa</span>
                                                    <span>:</span>
                                                </div>
                                            </td>
                                            <td>{item.suku_bangsa}</td>
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
                                            <td style={{ verticalAlign: 'top' }}>
                                                <div className="flex justify-between gap-3">
                                                    <span>Jabatan</span>
                                                    <span>:</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div style={{ display: 'flex', whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: item.jabatan }} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="flex justify-between gap-3">
                                                    <span>Tahun Jabatan</span>
                                                    <span>:</span>
                                                </div>
                                            </td>
                                            <td>{item.date_from ?? '-'} <small>s/d</small> {item.date_to ?? '-'}</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="flex justify-between gap-3">
                                                    <span>Leting</span>
                                                    <span>:</span>
                                                </div>
                                            </td>
                                            <td>{item.leting ?? '-'}</td>
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
                                            <td style={{ verticalAlign: 'top' }}>
                                                <div className="flex justify-between gap-3">
                                                    <span>Alamat</span>
                                                    <span>:</span>
                                                </div>
                                            </td>
                                            <td>
                                                <div style={{ display: 'flex', whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: item.alamat }} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <div className="flex justify-between gap-3">
                                                    <span>Deskripsi</span>
                                                    <span>:</span>
                                                </div>
                                            </td>
                                            <td>{item.deskripsi}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="flex items-start py-2 px-2">
                                <div className="flex gap-2">
                                    <UpdatePurnawirawanSatuanModal item={item} onSave={() => props.onSave && props.onSave()} satuan={props.satuan} />
                                    <Button className="border py-[0.2rem] bg-red-50 border-red-800 text-red-800" onClick={() => props.onDelete && props.onDelete(item.id)}>
                                        Hapus
                                    </Button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="flex justify-end px-5 py-3">
                {Object.keys(props.satuanPurnawirawan).length !== 0 && props.satuanPurnawirawan?.data?.length !== 0 && <SimplePagination pages={props.satuanPurnawirawan?.links ?? []} currentPage={props.satuanPurnawirawan?.current_page} onCallback={((page) => onNextPage({ page: page }))} />}
            </div>
        </Card>
    );
};

export default PejabatPurnawirawanDetail;
