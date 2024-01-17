import { Card } from "../../../../components";
import AddPrestasiSatuanModal from "./AddPrestasiSatuanModal";

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
              <div className="leading-5 mt-1">
                <span className="font-semibold text-[14px]">{item.title}</span>
                <p>{item.deskripsi}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default PrestasiTrakorpsDetail;
