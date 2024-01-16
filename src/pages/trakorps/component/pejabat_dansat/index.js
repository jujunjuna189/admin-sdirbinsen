import { Button, Card } from "../../../../components";

const PejabatDansatTrakorpsDetail = () => {
  return (
    <Card className="px-4">
      <div className="flex justify-between items-center pb-3">
        <span className="font-bold text-base">Data Pejabat Dansat</span>
        <Button className="bg-red-800 text-white flex justify-center py-[0.4rem]">Tambah</Button>
      </div>
      <hr />
    </Card>
  );
};

export default PejabatDansatTrakorpsDetail;
