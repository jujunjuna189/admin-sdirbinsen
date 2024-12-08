import { Button, Content, InputArea } from "../../../../components";
import { UseAnnouncementUpdateContext } from "../../../../contexts/announcement/AnnouncementUpdateContext";

const AnnouncementUpdatePage = () => {
    const { navigation, element, controller, errors, onSetController, onSave } = UseAnnouncementUpdateContext();

    return (
        <Content element={element}>
            <div className="flex gap-2 items-center cursor-pointer" onClick={() => navigation(-1)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M15 6l-6 6l6 6"></path>
                </svg>
                <span className="font-semibold text-base text-slate-800">Ubah Pengumuman</span>
            </div>
            <div className="flex justify-center">
                <div className="border rounded-lg p-3 w-full max-w-[652px]">
                    <span className="text-base font-medium">Ubah Pengumuman</span>
                    <div className="flex flex-col gap-3 mt-3">
                        <div className="flex flex-col gap-3 mt-3">
                            <div>
                                <div className="flex flex-col leading-4">
                                    <span className="font-medium">Pengumuman</span>
                                    <small>Isi "-" (strip) jika tidak ditambahkan Pengumuman</small>
                                </div>
                                <InputArea className="mt-3" value={controller.message} error={errors.message} onChange={(value) => onSetController('message', value)} placeholder="..." />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end mt-8 mb-3 gap-2">
                        <Button className="bg-slate-700 text-white" onClick={() => onSave()}>
                            Simpan
                        </Button>
                    </div>
                </div>
            </div>
        </Content>
    );
}

export default AnnouncementUpdatePage;