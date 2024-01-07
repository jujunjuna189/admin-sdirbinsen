import { Card } from "../../../../components";
const MarsTrakorpsDetail = (props) => {
  return (
    <>
      <Card className="rounded-[100px] w-full px-[20px] py-[10px] mt-2 flex gap-2 items-center">
        <span className="cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z" stroke-width="0" fill="currentColor" />
          </svg>
        </span>
        <div className="grow">
          <div className="rounded-full w-full bg-red-200">
            <div className="rounded-full p-1 w-52 bg-red-600" />
          </div>
        </div>
      </Card>
      <Card className="px-4 mt-2">
        <span className="font-bold text-base">Lirik Mars</span>
        <hr />
        <div className="mt-3" dangerouslySetInnerHTML={{ __html: props.satuan.mars }} />
      </Card>
    </>
  );
};

export default MarsTrakorpsDetail;
