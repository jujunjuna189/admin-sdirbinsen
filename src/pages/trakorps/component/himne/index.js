import { AudioPlayer, Card } from "../../../../components";
import UpdateHymneSatuanModal from "./UpdateHymneSatuanModal";
import UpdateHymneUrlSatuanModal from "./UpdateHymneUrlSatuanModal";

const HimneTrakorpsDetail = (props) => {
  return (
    <>
      <div className="flex gap-3 mt-4">
        <AudioPlayer source={props.satuan?.hymne_lagu ?? ''} />
        <div className="flex items-center">
          <UpdateHymneUrlSatuanModal onSave={() => props.onSave && props.onSave()} satuan={props.satuan} />
        </div>
      </div>
      <Card className="px-4 mt-2">
        <div className="flex justify-between items-center pb-3">
          <span className="font-bold text-base">Lirik himne</span>
          <UpdateHymneSatuanModal onSave={() => props.onSave && props.onSave()} satuan={props.satuan} />
        </div>
        <hr />
        <div className="mt-3" dangerouslySetInnerHTML={{ __html: props.satuan.hymne }} />
      </Card>
    </>
  );
};

export default HimneTrakorpsDetail;
