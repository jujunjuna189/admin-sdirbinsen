import { Card, Content, InputSearch, InputText } from "../../components";
import { UseChatContext } from "../../contexts/chat/ChatContext";
import { ElipsisFormatter } from "../../utils";
import { timeFormatter } from "../../utils/formatter/TimeFormatter";
import { AttachmentModal } from "./component";

const ChatPage = () => {
    const { messageReff, user, tab, contact, currentContact, chat, controller, onTabSwitch, onSetCurrentContact, onSetController, onSend, onManySend, downloadAttachment } = UseChatContext();
    return (
        <Content>
            <div className="flex gap-3 h-full">
                <Card className="border rounded-lg px-2 py-2">
                    <div className="rounded-full px-2 py-1 border flex gap-2 justify-center items-center">
                        {tab.map((item, index) => {
                            return (
                                <div key={index} className={`${item.isActive && 'bg-slate-200'} px-3 py-1 rounded-full font-medium cursor-pointer hover:bg-slate-200`} onClick={() => onTabSwitch(index)}>{item.title}</div>
                            );
                        })}
                    </div>
                    <hr className="mt-3" />
                    <InputSearch className="shadow-none border rounded-lg mt-2" placeholder="Cari..." />
                    <div className="my-5 overflow-y-auto flex flex-col gap-1">
                        {contact.map((item, index) => {
                            return (
                                <div key={index} className="flex gap-2 items-center cursor-pointer hover:bg-slate-100 p-1 rounded-lg" onClick={() => onSetCurrentContact(index)}>
                                    <div>
                                        <div className="bg-stone-50 border w-10 h-10 rounded-lg overflow-hidden flex justify-center items-center">
                                            {item.picture != null && <img src={item.picture} alt={item.name} className="w-full h-full" />}
                                            {item.picture == null && <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" className="text-stone-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M9 10l.01 0" /><path d="M15 10l.01 0" /><path d="M9.5 15a3.5 3.5 0 0 0 5 0" /></svg>}
                                        </div>
                                    </div>
                                    <div className="flex flex-col leading-4">
                                        <span className="font-medium">{ElipsisFormatter(item.name, 26)}</span>
                                        <small className="text-slate-700">{item.role?.name_lower}</small>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Card>
                <Card className="grow rounded-lg px-3 flex flex-col relative">
                    <div>
                        <div className="rounded-[15px] flex gap-2 items-center">
                            <div>
                                <div className="bg-stone-50 border w-10 h-10 rounded-lg overflow-hidden flex justify-center items-center">
                                    {currentContact.picture != null && <img src={currentContact.picture} alt={currentContact.name} className="w-full h-full" />}
                                    {currentContact.picture == null && <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" className="text-stone-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M9 10l.01 0" /><path d="M15 10l.01 0" /><path d="M9.5 15a3.5 3.5 0 0 0 5 0" /></svg>}
                                </div>
                            </div>
                            <div className="flex flex-col leading-4">
                                <span className="font-medium">{currentContact?.name}</span>
                                <small className="text-slate-700">{currentContact?.role?.name_lower}</small>
                            </div>
                        </div>
                        <hr className="mt-3" />
                    </div>
                    <div className="grow overflow-y-auto scrollbar-hidden " ref={messageReff}>
                        {chat.map((item, index) => {
                            return (
                                <div key={index} className={`flex ${item.from_id === user?.auth?.user?.id ? 'justify-end' : 'justify-start'} my-1`}>
                                    {item.from_id === user?.auth?.user?.id && (
                                        <div className="flex gap-1">
                                            <div className="flex flex-col bg-white border rounded-lg px-1 py-1 min-w-[15rem]">
                                                {item.attachment?.length > 0 && (
                                                    <div className="bg-slate-50 border rounded-md px-3 py-2 text-xs w-full flex gap-2 justify-between items-center min-w-[10rem]">
                                                        <div className="flex flex-col">
                                                            <span className="font-medium">{ElipsisFormatter(item.attachment_name ?? '', 20)}</span>
                                                            <small>{ElipsisFormatter(item.attachment ?? '', 20)}</small>
                                                        </div>
                                                        <div className="rounded-full border p-[5px] cursor-pointer" onClick={() => downloadAttachment({ id: item.id })}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" className="text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>
                                                        </div>
                                                    </div>
                                                )}
                                                <div className="flex flex-col px-2 py-1 leading-4">
                                                    <span className="">{item.message}</span>
                                                    <div className="flex justify-end">
                                                        <small className="mr-1 text-[9px]">{item.status ?? ''}</small><small className="text-[10px]">{timeFormatter(item.created_at)}</small>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="bg-stone-50 border w-7 h-7 rounded-lg overflow-hidden flex justify-center items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="text-stone-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M9 10l.01 0" /><path d="M15 10l.01 0" /><path d="M9.5 15a3.5 3.5 0 0 0 5 0" /></svg>
                                            </div>
                                        </div>
                                    )}
                                    {item.from_id !== user?.auth?.user?.id && (
                                        <div className="flex gap-1">
                                            <div className="bg-stone-50 border w-7 h-7 rounded-lg overflow-hidden flex justify-center items-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="text-stone-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M9 10l.01 0" /><path d="M15 10l.01 0" /><path d="M9.5 15a3.5 3.5 0 0 0 5 0" /></svg>
                                            </div>
                                            <div className="flex flex-col bg-slate-50 border rounded-lg px-1 py-1 min-w-[15rem]">
                                                {item.attachment?.length > 0 && (
                                                    <div className="bg-white border rounded-md px-3 py-2 text-xs w-full flex gap-2 justify-between items-center">
                                                        <div className="flex flex-col">
                                                            <span className="font-medium">{ElipsisFormatter(item.attachment_name ?? '', 20)}</span>
                                                            <small>{ElipsisFormatter(item.attachment ?? '', 20)}</small>
                                                        </div>
                                                        <div className="rounded-full border p-[5px] cursor-pointer" onClick={() => downloadAttachment({ id: item.id })}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" className="text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" ><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2 -2v-2" /><path d="M7 11l5 5l5 -5" /><path d="M12 4l0 12" /></svg>
                                                        </div>
                                                    </div>
                                                )}
                                                <div className="flex flex-col px-2 py-1 leading-4">
                                                    <span className="">{item.message}</span>
                                                    <div className="flex justify-end">
                                                        <small className="mr-1 text-[9px]">{item.status ?? ''}</small><small className="text-[10px]">{timeFormatter(item.created_at)}</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    <div className="mb-4 mt-5">
                        <div className="grow border flex rounded-lg items-center">
                            <AttachmentModal onSend={(value) => onManySend(value)} />
                            <InputText className="border-none" value={controller?.[0]?.message} onChange={(value) => onSetController({ message: value, attachment: null })} placeholder="Tulis Pesan..." />
                            <div className="mr-2 px-2 border-l cursor-pointer" onClick={() => onSend()}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4.698 4.034l16.302 7.966l-16.302 7.966a.503 .503 0 0 1 -.546 -.124a.555 .555 0 0 1 -.12 -.568l2.468 -7.274l-2.468 -7.274a.555 .555 0 0 1 .12 -.568a.503 .503 0 0 1 .546 -.124z" /><path d="M6.5 12h14.5" /></svg>
                            </div>
                        </div>
                    </div>
                    {Object.keys(currentContact).length === 0 && chat.length === 0 && (
                        <div className="absolute top-0 bottom-0 left-0 right-0 bg-white rounded-lg flex justify-center items-center text-center">
                            <div className="flex flex-col">
                                <div className="flex justify-center py-5">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" className="text-red-700 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10" /><path d="M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2" /></svg>
                                </div>
                                <span className="font-semibold text-base">Kirim Pesan dan Dokumen Lebih Mudah</span>
                                <small>Send your message to your kontak or user</small>
                            </div>
                        </div>
                    )}
                </Card>
            </div>
        </Content>
    );
}

export default ChatPage;