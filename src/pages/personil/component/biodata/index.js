import { Button } from "../../../../components";
import { getLocalUser } from "../../../../utils";

const BiodataPersonilDetail = (props) => {
  return (
    <div>
      <div className="shadow-none p-4 border rounded-lg">
        <span className="font-semibold text-base">Biodata</span>
        <div className="px-2 mt-2">
          <table className="w-full">
            <tbody>
              <tr>
                <td className="py-[7px]">
                  <span className="font-medium">NRP</span>
                </td>
                <td className="py-[7px]">
                  <span className="px-4">: {props.personil?.nrp}</span>
                </td>
              </tr>
              <tr>
                <td className="py-[7px]">
                  <span className="font-medium">Nama</span>
                </td>
                <td className="py-[7px]">
                  <span className="px-4">: {props.personil?.nama}</span>
                </td>
              </tr>
              <tr>
                <td className="py-[7px]">
                  <span className="font-medium">Tanggal Lahir</span>
                </td>
                <td className="py-[7px]">
                  <span className="px-4">: {props.personil?.tanggal_lahir}</span>
                </td>
              </tr>
              <tr>
                <td className="py-[7px]">
                  <span className="font-medium">Tempat Lahir</span>
                </td>
                <td className="py-[7px]">
                  <span className="px-4">: {props.personil?.tempat_lahir}</span>
                </td>
              </tr>
              <tr>
                <td className="py-[7px]">
                  <span className="font-medium">Agama</span>
                </td>
                <td className="py-[7px]">
                  <span className="px-4">: {props.personil?.agama}</span>
                </td>
              </tr>
              <tr>
                <td className="py-[7px]">
                  <span className="font-medium">Suku Bangsa</span>
                </td>
                <td className="py-[7px]">
                  <span className="px-4">: {props.personil?.suku_bangsa}</span>
                </td>
              </tr>
              <tr>
                <td className="py-[7px]">
                  <span className="font-medium">Gol. Darah</span>
                </td>
                <td className="py-[7px]">
                  <span className="px-4">: {props.personil?.golongan_darah}</span>
                </td>
              </tr>
              <tr className="border-t">
                <td className="py-[7px]">
                  <span className="font-medium">Jabatan</span>
                </td>
                <td className="py-[7px]">
                  <span className="px-4">: {props.personil?.jabatan}</span>
                </td>
              </tr>
              <tr>
                <td className="py-[7px]">
                  <span className="font-medium">Pangkat</span>
                </td>
                <td className="py-[7px]">
                  <span className="px-4">: {props.personil?.pangkat}</span>
                </td>
              </tr>
              <tr>
                <td className="py-[7px]">
                  <span className="font-medium">Korps</span>
                </td>
                <td className="py-[7px]">
                  <span className="px-4">: {props.personil?.korps}</span>
                </td>
              </tr>
              <tr>
                <td className="py-[7px]">
                  <span className="font-medium">Sumber Pa</span>
                </td>
                <td className="py-[7px]">
                  <span className="px-4">: {props.personil?.sumber_pa}</span>
                </td>
              </tr>
              <tr>
                <td className="py-[7px]">
                  <span className="font-medium">Satuan</span>
                </td>
                <td className="py-[7px]">
                  <span className="px-4">: {props.personil?.satuan?.nama}</span>
                </td>
              </tr>
              <tr>
                <td className="py-[7px]">
                  <span className="font-medium">Psi</span>
                </td>
                <td className="py-[7px]">
                  <span className="px-4">: {props.personil?.psi}</span>
                </td>
              </tr>
              <tr>
                <td className="py-[7px]">
                  <span className="font-medium">Kategori</span>
                </td>
                <td className="py-[7px]">
                  <span className="px-4">: {props.personil?.status}</span>
                </td>
              </tr>
              <tr className="border-t">
                <td className="py-[7px]">
                  <span className="font-medium">TMT</span>
                </td>
                <td className="py-[7px]">
                  <span className="px-4">: {props.personil?.tmt_1}</span>
                </td>
              </tr>
              <tr>
                <td className="py-[7px]">
                  <span className="font-medium">TMT</span>
                </td>
                <td className="py-[7px]">
                  <span className="px-4">: {props.personil?.tmt_2}</span>
                </td>
              </tr>
              <tr>
                <td className="py-[7px]">
                  <span className="font-medium">TMT TNI</span>
                </td>
                <td className="py-[7px]">
                  <span className="px-4">: {props.personil?.tmt_tni}</span>
                </td>
              </tr>
              <tr>
                <td className="py-[7px]">
                  <span className="font-medium">TMT Jab</span>
                </td>
                <td className="py-[7px]">
                  <span className="px-4">: {props.personil?.tmt_jab}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="grow flex items-center gap-2 mt-4">
          {getLocalUser()?.auth?.permission["personil.update"] && (
            <Button className="border border-yellow-700 bg-yellow-50 text-yellow-700 flex justify-center" onClick={() => props.navigation(`/personil/update/${props?.personil?.id}`)}>
              Ubah Personil
            </Button>
          )}
          <Button className="border border-green-700 bg-green-50 text-green-700 flex justify-center">Download Portofolio</Button>
        </div>
      </div>
    </div>
  );
};

export default BiodataPersonilDetail;
