import { useLocation, useNavigate } from "react-router-dom";

const LapsatNav = () => {
    const navigation = useNavigate();
    const location = useLocation();
    return (
        <div className="flex gap-2">
            <div className={`rounded-lg ${location.pathname === '/siapsat/lapsat_induk' ? 'bg-slate-700 text-white' : 'border border-slate-700'} px-3 py-1 cursor-pointer`} onClick={() => navigation("/siapsat/lapsat_induk")}>Induk</div>
            <div className={`rounded-lg ${location.pathname === '/siapsat/lapsat_lampiran' ? 'bg-slate-700 text-white' : 'border border-slate-700'}  px-3 py-1 cursor-pointer`} onClick={() => navigation("/siapsat/lapsat_lampiran")}>Lampiran</div>
        </div>
    );
}

export default LapsatNav;