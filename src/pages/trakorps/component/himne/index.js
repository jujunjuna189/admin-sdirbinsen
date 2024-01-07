import { Card } from "../../../../components";

const HimneTrakorpsDetail = (props) => {
  return (
    <Card className="px-4">
      <span className="font-bold text-base">Lirik Himne</span>
      <hr />
      <div className="mt-3" dangerouslySetInnerHTML={{ __html: props.satuan.hymne }} />
    </Card>
  );
};

export default HimneTrakorpsDetail;
