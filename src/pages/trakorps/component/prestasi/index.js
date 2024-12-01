import { Button, Card } from "../../../../components";
import AddPrestasiSatuanModal from "./AddPrestasiSatuanModal";
import UpdatePrestasiSatuanModal from "./UpdatePrestasiSatuanModal";

const PrestasiTrakorpsDetail = (props) => {
  return (
    <Card className="px-4">
      <div className="flex justify-between items-center pb-3">
        <span className="font-bold text-base">Data Prestasi</span>
        <AddPrestasiSatuanModal satuan={props.satuan} onSave={() => props.onSave && props.onSave()} />
      </div>
      <hr />
      <div className="my-3">
        {props.satuanPrestasi?.data?.map((item, index) => {
          return (
            <div key={index} className="flex gap-3 border py-1 px-1 rounded-lg mb-2">
              {item.gambar && (
                <div className="h-16 w-16 relative border rounded-lg overflow-hidden">
                  <img src={item.gambar} alt="ImagePrestasi" className="object-cover w-full h-full" />
                </div>
              )}
              <div className="leading-5 mt-1 grow">
                <span className="font-semibold text-[14px]">{item.title}</span>
                <p>{item.deskripsi}</p>
              </div>
              <div className="flex items-start py-2 px-2">
                <div className="flex gap-2">
                  <UpdatePrestasiSatuanModal item={item} onSave={() => props.onSave && props.onSave()} satuan={props.satuan} />
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

export default PrestasiTrakorpsDetail;
