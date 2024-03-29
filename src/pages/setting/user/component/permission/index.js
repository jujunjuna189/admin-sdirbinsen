import { Button } from "../../../../../components";

const PermissionSetting = (props) => {

    return (
        <div className="px-2">
            <div className="flex justify-between items-center">
                <span className="text-base font-semibold">Lis Perizinan</span>
                <Button className="bg-red-800 text-white text-xs" onClick={() => props.onAdd && props.onAdd()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M12 5l0 14"></path>
                        <path d="M5 12l14 0"></path>
                    </svg>
                    Tambah
                </Button>
            </div>
            <ul className="flex flex-col gap-1 mt-4">
                {props.permission && Object.keys(props.permission)?.map((item, index) => {
                    return (
                        <div key={index}>
                            <span className="font-medium">{item}</span>
                            {props.permission?.[item]?.map((itemChild, indexChild) => {
                                return (
                                    <li key={indexChild} className="rounded-md border py-2 px-3 flex justify-between items-center my-1">
                                        <div className="flex gap-1 items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                <path d="M12 7a5 5 0 1 1 -4.995 5.217l-.005 -.217l.005 -.217a5 5 0 0 1 4.995 -4.783z" strokeWidth="0" fill="currentColor"></path>
                                            </svg>
                                            <div className="flex flex-col leading-4">
                                                <span className="font-medium">{itemChild.original_data?.display}</span>
                                                <small>{itemChild.original_data?.key}</small>
                                            </div>
                                        </div>
                                        <span className="cursor-pointer" onClick={() => props.onShowConfirmDelete && props.onShowConfirmDelete(itemChild?.original_data?.id)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                                <path d="M4 7l16 0"></path>
                                                <path d="M10 11l0 6"></path>
                                                <path d="M14 11l0 6"></path>
                                                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                                                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                                            </svg>
                                        </span>
                                    </li>
                                )
                            })}
                        </div>
                    );
                })}
            </ul>
        </div>
    );
}

export default PermissionSetting;