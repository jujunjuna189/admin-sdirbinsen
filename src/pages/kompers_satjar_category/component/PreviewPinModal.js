import { useEffect, useState } from "react";
import { Button } from "../../../components";

const PreviewPinModal = (props) => {
  const [data, setData] = useState({});

  const onClickOutside = () => {
    props.onClickOutside && props.onClickOutside();
  }

  const onRemove = (col) => {
    var datas = { ...data };
    delete datas[col];
    console.log(datas);
    setData({ ...datas });
    props.onRemove && props.onRemove(col, datas);
  }

  const onCancel = () => {
    props.onCancel && props.onCancel();
  }

  useEffect(() => {
    setData({ ...props.data });
  }, [props.data]);

  return (
    <div className="fixed bottom-0 top-0 left-0 right-0 flex justify-center items-center z-10">
      {console.log(props.data)}
      <div className="absolute h-full w-full bg-black opacity-30" onClick={() => onClickOutside()} />
      <div className="p-3 border rounded-lg bg-white min-w-[40rem] z-10">
        <div className="leading-3">
          <span className="text-base font-medium">Preview Pin Kolom</span>
        </div>
        <div className="flex flex-col gap-1 py-2 my-2">
          <div className="flex flex-col leading-3">
            <table>
              <thead>
                <tr>
                  {Object.keys(data ?? {}).length === 0 && (
                    <th>Tidak ada kolom</th>
                  )}
                  {Object.keys(data ?? {})?.map((item, index) => {
                    return (
                      <th key={index} className="py-3 px-3 border border-gray-300 relative" onClick={() => onRemove(item)}>
                        <div className="absolute top-[0.40rem] right-2">
                          <svg xmlns="http://www.w3.org/2000/svg" className="text-red-800" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M9 12l6 0" /></svg>
                        </div>
                        <span>{data[item].columnName}</span>
                      </th>
                    );
                  })}
                </tr>
              </thead>
            </table>
          </div>
          <div className="flex-grow" />
          <div className="flex justify-end mt-3 gap-3">
            <Button className="bg-slate-700 text-white" onClick={() => onCancel()}>Oke</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreviewPinModal;