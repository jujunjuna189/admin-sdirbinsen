import { icSoldier } from "../../../../assets";
import { Button, Card } from "../../../../components";
import AddPejabatDansatSatuanModal from "./AddPejabatDansatSatuanModal";
import UpdatePejabatDansatSatuanModal from "./UpdatePejabatDansatSatuanModal";

const PejabatDansatTrakorpsDetail = (props) => {

  const renderStar = (star) => {
    var element = [];
    if(star <= 4){
      for(var i = 1; i <= star; i++){
        element.push(
          <svg  xmlns="http://www.w3.org/2000/svg" className="text-yellow-500" width="16"  height="16"  viewBox="0 0 24 24"  fill="currentColor" ><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" /></svg>
        );
      }
    }else{
      element.push(<span>Bintang tidak valid</span>);
    }
    
    return element;
  }

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
                  <div className="flex items-center">
                      {renderStar(item.star ?? 0)}
                  </div>
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
