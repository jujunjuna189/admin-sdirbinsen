import { Button } from "../../../../components";

const BiodataPersonilDetail = (props) => {

    return (
        <div>
            <div className="shadow-none p-4 border rounded-lg">
                <span className="font-semibold text-base">Biodata</span>
                <div className="px-2 mt-2">
                    <table>
                        <tbody>
                            <tr>
                                <td className="py-[7px]"><span className="font-medium">NRP</span></td>
                                <td className="py-[7px]"><span className="px-4">: {props.personil?.nrp}</span></td>
                            </tr>
                            <tr>
                                <td className="py-[7px]"><span className="font-medium">Nama Lengkap</span></td>
                                <td className="py-[7px]"><span className="px-4">: {props.personil?.nama}</span></td>
                            </tr>
                            <tr>
                                <td className="py-[7px]"><span className="font-medium">Tanggal Lahir</span></td>
                                <td className="py-[7px]"><span className="px-4">: {props.personil?.tanggal_lahir}</span></td>
                            </tr>
                            <tr>
                                <td className="py-[7px]"><span className="font-medium">Tempat Lahir</span></td>
                                <td className="py-[7px]"><span className="px-4">: {props.personil?.tempat_lahir}</span></td>
                            </tr>
                            <tr>
                                <td className="py-[7px]"><span className="font-medium">Agama</span></td>
                                <td className="py-[7px]"><span className="px-4">: {props.personil?.agama}</span></td>
                            </tr>
                            <tr>
                                <td className="py-[7px]"><span className="font-medium">Suku Bangsa</span></td>
                                <td className="py-[7px]"><span className="px-4">: {props.personil?.suku_bangsa}</span></td>
                            </tr>
                            <tr>
                                <td className="py-[7px]"><span className="font-medium">Gol. Darah</span></td>
                                <td className="py-[7px]"><span className="px-4">: {props.personil?.golongan_darah}</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="grow flex items-center gap-2 mt-4">
                    <Button className="border border-yellow-700 bg-yellow-50 text-yellow-700 flex justify-center" onClick={() => props.navigation(`/personil/update/${props?.personil?.id}`)}>Ubah Personil</Button>
                    <Button className="border border-green-700 bg-green-50 text-green-700 flex justify-center">Download Portofolio</Button>
                </div>
            </div>
            <div className="flex gap-2 mt-2">
                <div className="shadow-none px-4 py-3 border rounded-lg">
                    <span>Status: </span>
                    <span className="text-green-800 font-semibold px-2">{props.personil?.status}</span>
                </div>
                <div className="shadow-none px-4 py-3 border rounded-lg">
                    <span>Satuan: </span>
                    <span className="font-semibold px-2">{props.personil?.satuan}</span>
                </div>
                <div className="shadow-none px-4 py-3 border rounded-lg">
                    <span>Jabatan: </span>
                    <span className="font-semibold px-2">{props.personil?.jabatan_sekarang?.jabatan ?? ''}</span>
                </div>
                <div className="shadow-none px-4 py-3 border rounded-lg">
                    <span>Pangkat: </span>
                    <span className="font-semibold px-2">{props.personil?.kepangkatan_sekarang?.pangkat ?? ''}</span>
                </div>
            </div>
        </div>
    );
}

export default BiodataPersonilDetail;