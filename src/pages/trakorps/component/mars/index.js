import { AudioPlayer, Card } from "../../../../components";
import UpdateMarsSatuanModal from "./UpdateMarsSatuanModal";
import UpdateMarsUrlSatuanModal from "./UpdateMarsUrlSatuanModal";
const MarsTrakorpsDetail = (props) => {
  return (
    <>
      <div className="flex gap-3 mt-4">
        <AudioPlayer source={props.satuan?.mars_lagu ?? ''} />
        <div className="flex items-center">
          <UpdateMarsUrlSatuanModal onSave={() => props.onSave && props.onSave()} satuan={props.satuan} />
        </div>
      </div>
      <Card className="px-4 mt-2">
        <div className="flex justify-between items-center pb-3">
          <span className="font-bold text-base">Lirik Mars</span>
          <UpdateMarsSatuanModal onSave={() => props.onSave && props.onSave()} satuan={props.satuan} />
        </div>
        <hr />
        <div className="mt-3" dangerouslySetInnerHTML={{ __html: props.satuan.mars }} />
      </Card>
    </>
  );
};

export default MarsTrakorpsDetail;
