import { Button, Content, InputText, } from "../../components";
import { UseReferensiContext } from "../../contexts/referensi/ReferensiContext";
import CreateFolderModal from "./component/modal/CreateFolderModal";
import FolderMenusPopup from "./component/popup/FolderMenusPopup";

const ReferensiPage = () => {
    const { referensi, filter, getReferensi, onPrev, onNext } = UseReferensiContext();

    return (
        <Content>
            <div className="">
                <div className="">
                    <InputText className="shadow-none h-12" value={`>${filter.path}`} placeholder="Paste path" />
                </div>
                <div className="mt-2 flex gap-3">
                    <div className="flex gap-1">
                        <Button className="text-sm border" onClick={() => onPrev()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M15 6l-6 6l6 6" /></svg>
                        </Button>
                        <Button className="text-sm border" onClick={() => onNext({ value: '' })}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 6l6 6l-6 6" /></svg>
                        </Button>
                    </div>
                    <CreateFolderModal path={filter.path} onSave={() => getReferensi()} />
                </div>
                <hr className="my-4" />
                <div className="">
                    <span className="font-semibold">Folder</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                    {referensi?.data?.map((item, index) => {
                        return (
                            <Button key={index} className="text-sm border border-slate-500 pl-2 pr-1">
                                <div onDoubleClick={() => onNext({ value: item.title })}>
                                    <div className="flex gap-2 pr-6">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M5 4h4l3 3h7a2 2 0 0 1 2 2v8a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2" /></svg>
                                        <span>{item.title}</span>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    {item.link && (
                                        <div onClick={() => window.open(item.link)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="text-green-800" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" /><path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" /></svg>
                                        </div>
                                    )}
                                    <FolderMenusPopup data={item} onDelete={() => getReferensi()} />
                                </div>
                            </Button>
                        );
                    })}
                </div>
            </div>
        </Content>
    );
};

export default ReferensiPage;
