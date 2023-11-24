import { Content } from "../../../components";
import { UsePersonilDetailContext } from "../../../contexts/personil/PersonilDetailContext";

const PersonilDetailPage = () => {
    const { navigation, element, personil, navProfile, navProfileActive, onChangeNavProfile, onGetContent } = UsePersonilDetailContext();

    return (
        <Content element={element}>
            <div className="flex gap-2 items-center cursor-pointer" onClick={() => navigation(-1)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M15 6l-6 6l6 6"></path>
                </svg>
                <span className="font-semibold text-base text-slate-800">Detail Personil</span>
            </div>
            <div className="flex gap-2 mt-4">
                <div className="w-80">
                    <div className="sticky top-0">
                        <div className="py-4 p-2 border rounded-lg bg-white">
                            <div className="flex justify-center mb-3">
                                <div className="h-24 w-24 border bg-slate-400 rounded-full overflow-hidden">
                                    {personil.picture && (<img src={personil.picture} alt="ImagePersonil" className="w-full h-full object-cover" />)}
                                </div>
                            </div>
                            <div className="text-center leading-4">
                                <span className="font-semibold text-base">{personil.nama}</span><br />
                                <div className="flex gap-2 items-center justify-center mt-2">
                                    <div className="py-1 px-2 border rounded-lg border-slate-300">
                                        <span className="font-medium">Satuan: </span>
                                        <span>{personil.satuan_sekarang?.nama}</span>
                                    </div>
                                    <span className="text-slate-300">|</span>
                                    <div className="py-1 px-3 border rounded-lg border-slate-300">
                                        <span className="font-medium">NRP: </span>
                                        <span>{personil.nrp}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {navProfile.map((item, index) => {
                            return (
                                <div key={index} className={`py-2 px-3 border rounded-lg mt-2 cursor-pointer ${item.is_active && 'border-red-700 bg-red-50 text-red-700'}`} onClick={() => onChangeNavProfile(index)}>
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium">{item.title}</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className={`${item.is_active ? 'text-red-700' : 'text-slate-300'}`} width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                            <path d="M9 6l6 6l-6 6"></path>
                                        </svg>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="flex-grow">
                    {onGetContent(navProfileActive.page)}
                </div>
            </div>
        </Content>
    );
}
export default PersonilDetailPage;