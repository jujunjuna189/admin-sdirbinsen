import { Card } from "../../../../components";
import UpdateSejarahSatuanModal from "./UpdateSejarahSatuanModal";

const SejarahTrakorpsDetail = (props) => {
  return (
    <Card className="px-4">
      <div className="flex justify-between items-center pb-3">
        <span className="font-bold text-base">Sejarah</span>
        <UpdateSejarahSatuanModal onSave={() => props.onSave && props.onSave()} satuan={props.satuan} />
      </div>
      <hr />
      <div className="mt-3" style={{ display: 'flex', whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: props.satuan.sejarah }} />
    </Card>
  );
};

export default SejarahTrakorpsDetail;
