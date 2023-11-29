import { useNavigate } from "react-router-dom";
import { UseAuthContext } from "../../../contexts/auth/AuthContext";
import { getLocalUser } from "../../../utils";
import { Button } from "../../atoms";
import Card from "../card";

const MenuProfileModal = (props) => {
    const { onLogout } = UseAuthContext();
    const navigation = useNavigate();

    return (
        <div className="absolute top-[3rem] right-5 w-80 pt-5 -mt-1 cursor-pointer" onMouseOver={() => props.onMouseOver && props.onMouseOver()} onMouseLeave={() => props.onMouseLeave && props.onMouseLeave()}>
            <Card className="shadow-lg">
                <div className="leading-3 px-4">
                    <h4 className="font-bold text-base">{props.user?.auth?.user?.name ? props.user?.auth?.user?.name.split(' ')[0] : 'Anonim'}</h4>
                    <span className="font-medium">{props.user?.auth?.user?.username}</span>
                </div>
                <div className="border-t w-full h-[1px] my-3" />
                <div className="mt-2 px-4">
                    <ul>
                        <li className="py-1 px-2 hover:bg-slate-100 rounded-lg" onClick={() => navigation('/profile')}><span>Biodata</span></li>
                        {getLocalUser()?.auth?.permission?.['setting.menu'] && (
                            <li className="py-1 px-2 hover:bg-slate-100 rounded-lg" onClick={() => navigation('/setting/personil')}>
                                <span>Pengaturan</span>
                            </li>
                        )}
                    </ul>
                </div>
                <div className="border-t w-full h-[1px] my-3" />
                <div className="mt-2 px-4">
                    <Button className="bg-slate-200 hover:bg-slate-300 flex justify-center" onClick={() => onLogout()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M10 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2"></path>
                            <path d="M15 12h-12l3 -3"></path>
                            <path d="M6 15l-3 -3"></path>
                        </svg>
                        <span className="font-medium">Keluar</span>
                    </Button>
                </div>
            </Card>
        </div>
    );
}
export default MenuProfileModal;