import { icSoldier } from "../../../../assets";
import { Button, Card } from "../../../../components";
import AddPejabatDansatSatuanModal from "./AddPejabatDansatSatuanModal";
import UpdatePejabatDansatSatuanModal from "./UpdatePejabatDansatSatuanModal";

const PejabatDansatTrakorpsDetail = (props) => {
  return (
    <Card className="px-4">
      <div className="flex justify-between items-center pb-3">
        <span className="font-bold text-base">Data Pejabat Dansat</span>
        <AddPejabatDansatSatuanModal satuan={props.satuan} onSave={() => props.onSave && props.onSave()} />
      </div>
      <hr />
      <div className="my-3">
        {props.satuanPejabatDansat?.data?.map((item, index) => {
          return (
            <div key={index} className="flex justify-between border py-1 px-1 rounded-lg mb-2">
              <div className="flex gap-3">
                {!item.gambar && (
                  <div className="h-16 w-16 relative border rounded-lg overflow-hidden">
                    <img src={icSoldier} alt="ImagePrestasi" className="object-cover w-full h-full" />
                  </div>
                )}
                {item.gambar && (
                  <div className="h-16 w-16 relative border rounded-lg overflow-hidden">
                    <img src={item.gambar} alt="ImagePrestasi" className="object-cover w-full h-full" />
                  </div>
                )}
                <div className="leading-5 mt-1">
                  <span className="font-semibold text-[14px]">{item.nama}</span>
                  <p>{item.deskripsi}</p>
                  <p>
                    <small>Masa Jabatan:</small>
                    <p>{item.date_from}-{item.date_to}</p>
                  </p>
                </div>
              </div>
              <div className="flex items-start py-2 px-2">
                <div className="flex gap-2">
                  <UpdatePejabatDansatSatuanModal item={item} onSave={() => props.onSave && props.onSave()} satuan={props.satuan} />
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

export default PejabatDansatTrakorpsDetail;
