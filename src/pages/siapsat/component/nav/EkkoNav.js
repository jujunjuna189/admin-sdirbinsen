import { useLocation, useNavigate } from "react-router-dom";

const EkkoNav = () => {
    const navigation = useNavigate();
    const location = useLocation();
    return (
        <div className="flex gap-2">
            <div className={`rounded-lg ${location.pathname === '/siapsat/ekko_induk' ? 'bg-slate-700 text-white' : 'border border-slate-700'} px-3 py-1 cursor-pointer`} onClick={() => navigation("/siapsat/ekko_induk")}>Induk</div>
            <div className={`rounded-lg ${location.pathname === '/siapsat' ? 'bg-slate-700 text-white' : 'border border-slate-700'}  px-3 py-1 cursor-pointer`} onClick={() => navigation("/siapsat")}>Lampiran</div>
        </div>
    );
}

export default EkkoNav;