import { Card } from "../../../../components";

const SejarahTrakorpsDetail = (props) => {
  return (
    <Card className="px-4">
      <span className="font-bold text-base">Sejarah</span>
      <hr />
      <div className="mt-3" dangerouslySetInnerHTML={{ __html: props.satuan.sejarah }} />
    </Card>
  );
};

export default SejarahTrakorpsDetail;
