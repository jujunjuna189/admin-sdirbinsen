import AddPendidikanMiliterModal from "./AddPendidikanMiliterModal";

const PendidikanMiliterPersonilDetail = (props) => {
  return (
    <div>
      <div className="shadow-none p-4 border rounded-lg">
        <div className="flex gap-2 items-end">
          <span className="font-semibold text-base">Pendidikan Militer</span>
          <small>(Dikma/Diktuk/Dibangum)</small>
        </div>
        <div className="mt-2 px-3">
          <span className="font-semibold">Riwayat Pendidikan Militer</span>
        </div>
        <div className="mt-4 px-3">
          <div className="border-l-2 border-slate-200 px-5 py-2 relative flex items-center">
            <div className="absolute w-3 h-3 rounded-full bg-white border -left-[0.45rem]"></div>
            <div className="relative flex items-center w-96">
              <div className="border-solid border-r-8 border-y-transparent border-y-8 border-l-0 absolute -left-2"></div>
              <div className="border border-dashed rounded-lg p-3 bg-white pr-10 flex-grow flex justify-between items-center gap-3 cursor-pointer">
                <AddPendidikanMiliterModal personil_id={props.personil?.id} onSave={() => props.onAdd && props.onAdd()} />
              </div>
            </div>
          </div>
          {props.pendidikan?.data?.map((item, index) => {
            return (
              <div key={index} className="border-l-2 border-slate-200 px-5 py-2 relative flex items-center">
                <div className="absolute w-3 h-3 rounded-full bg-white border -left-[0.45rem]"></div>
                <div className="relative flex items-center">
                  <div className="border-solid border-r-8 border-y-transparent border-y-8 border-l-0 absolute -left-2"></div>
                  <div className="border rounded-lg p-3 bg-white pr-10 flex-grow w-96">
                    <span className="font-medium">{item.nama_dik}</span>
                    <div className="flex flex-wrap gap-3 items-center">
                      <div className="leading-3 mt-1">
                        <small className="font-medium">Jenis Pendidikan</small>
                        <br />
                        <small>{item.jenis_dik}</small>
                      </div>
                      <div className="h-3 w-[1px] bg-slate-300" />
                      <div className="leading-3 mt-1">
                        <small className="font-medium">Tahun</small>
                        <br />
                        <small>{item.tahun}</small>
                      </div>
                      <div className="h-3 w-[1px] bg-slate-300" />
                      <div className="leading-3 mt-1">
                        <small className="font-medium">Status</small>
                        <br />
                        <small>{item.status}</small>
                      </div>
                      <div className="h-3 w-[1px] bg-slate-300" />
                      <div className="leading-3 mt-1">
                        <small className="font-medium">Prestasi</small>
                        <br />
                        <small>{item.prestasi ?? "..."}</small>
                      </div>
                    </div>
                  </div>
                  <div className="mx-3 flex gap-2">
                    <div className="border p-1 rounded-md cursor-pointer bg-yellow-50 border-yellow-700 text-yellow-700">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4"></path>
                        <path d="M13.5 6.5l4 4"></path>
                      </svg>
                    </div>
                    <div className="border p-1 rounded-md cursor-pointer bg-red-50 border-red-700 text-red-700" onClick={() => props.onShowConfirmDelete && props.onShowConfirmDelete(item.id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M4 7l16 0"></path>
                        <path d="M10 11l0 6"></path>
                        <path d="M14 11l0 6"></path>
                        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PendidikanMiliterPersonilDetail;
