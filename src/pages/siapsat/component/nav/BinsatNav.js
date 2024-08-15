import { useLocation, useNavigate } from "react-router-dom";

const BinsatNav = () => {
    const navigation = useNavigate();
    const location = useLocation();
    return (
        <div className="flex gap-2">
            <div className={`rounded-lg ${location.pathname === '/siapsat/binsat_renlakgiat' ? 'bg-slate-700 text-white' : 'border border-slate-700'} px-3 py-1 cursor-pointer`} onClick={() => navigation("/siapsat/binsat_renlakgiat")}>Renlakgiat</div>
            <div className={`rounded-lg ${location.pathname === '/siapsat/binsat_laplakgiat' ? 'bg-slate-700 text-white' : 'border border-slate-700'}  px-3 py-1 cursor-pointer`} onClick={() => navigation("/siapsat/binsat_laplakgiat")}>Laplakgiat</div>
        </div>
    );
}

export default BinsatNav;