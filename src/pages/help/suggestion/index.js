import { HelpContent } from "../../../components";

const HelpSuggestionPage = () => {
    return (
        <HelpContent>
            <div className="border rounded-lg h-full overflow-y-auto scroll-hidden flex flex-col">
                <div className="flex flex-col text-center pt-5">
                    <span className="text-lg font-semibold">Saran Pengembangan</span>
                    <span className="">Pengembangan Aplikasi</span>
                </div>
                <div className="my-5 flex gap-2 px-3 grow">
                    <div>
                        <div className="border rounded-lg px-2 py-1 w-[14rem] min-w-[14rem] max-w-[14rem]">
                            <div className="text-center py-2">
                                <span className="font-medium text-center">Lis Saran</span>
                            </div>
                            <div className="mt-2">

                            </div>
                        </div>
                    </div>
                    <div className="grow h-full border rounded-lg">

                    </div>
                </div>
            </div>
        </HelpContent>
    );
}

export default HelpSuggestionPage;