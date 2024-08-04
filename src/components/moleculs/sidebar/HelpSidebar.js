import { useNavigate } from "react-router-dom";

const HelpSidebar = (props) => {
    const navigation = useNavigate();

    return (
        <aside className="relative w-[13rem] w-min-[13rem] w-max-[13rem] border-e bg-white">
            <div className="px-2 py-3 mb-2 border-y cursor-pointer" onClick={() => navigation('/dashboard')}>
                <div className="flex gap-3 items-center justify-center text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M15 6l-6 6l6 6"></path>
                    </svg>
                    <span className="font-medium text-xs">Keluar Dari Help Center</span>
                </div>
            </div>
            <div className="px-4 py-3 cursor-pointer mt-2 hover:bg-slate-100" onClick={() => navigation('/help-center/tutorial')}>
                <div className="flex gap-3 items-center text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="text-red-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 4m0 1a1 1 0 0 1 1 -1h14a1 1 0 0 1 1 1v2a1 1 0 0 1 -1 1h-14a1 1 0 0 1 -1 -1z" /><path d="M4 12m0 1a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z" /><path d="M14 12l6 0" /><path d="M14 16l6 0" /><path d="M14 20l6 0" /></svg>
                    <span className="font-medium text-xs">Penggunaan Aplikasi</span>
                </div>
            </div>
            <div className="px-4 py-3 cursor-pointer hover:bg-slate-100" onClick={() => navigation('/help-center/ticket')}>
                <div className="flex gap-3 items-center text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="text-red-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" /><path d="M8 13h1v3h-1z" /><path d="M12 13v3" /><path d="M15 13h1v3h-1z" /></svg>
                    <span className="font-medium text-xs">Tiket Kendala</span>
                </div>
            </div>
            <div className="px-4 py-3 cursor-pointer hover:bg-slate-100" onClick={() => navigation('/help-center/suggestion')}>
                <div className="flex gap-3 items-center text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="text-red-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M14.986 3.51a9 9 0 1 0 1.514 16.284c2.489 -1.437 4.181 -3.978 4.5 -6.794" /><path d="M10 10h.01" /><path d="M14 8h.01" /><path d="M12 15c1 -1.333 2 -2 3 -2" /><path d="M20 9v.01" /><path d="M20 6a2.003 2.003 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483" /></svg>
                    <span className="font-medium text-xs">Saran Pengembangan</span>
                </div>
            </div>
        </aside>
    );
}

export default HelpSidebar;