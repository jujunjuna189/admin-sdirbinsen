import { HelpContent } from "../../../components";

const HelpTutorialPage = () => {
    return (
        <HelpContent>
            <div className="border rounded-lg h-full overflow-y-auto scroll-hidden">
                <div className="flex flex-col text-center py-5">
                    <span className="text-lg font-semibold">Cara Penggunaan Aplikasi</span>
                    <span className="">Pusat Bantuan</span>
                </div>
                <div className="py-20 text-center">
                    <span className="text-lg font-semibold text-slate-500">
                        Comming Soon
                    </span>
                </div>
            </div>
        </HelpContent>
    );
}

export default HelpTutorialPage;