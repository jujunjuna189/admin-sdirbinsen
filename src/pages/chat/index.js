import { Card, Content, InputSearch } from "../../components";
import { UseChatContext } from "../../contexts/chat/ChatContext";
import { ElipsisFormatter } from "../../utils";
import { timeFormatter } from "../../utils/formatter/TimeFormatter";

const ChatPage = () => {
    const { user, tab, contact, currentContact, chat, onTabSwitch, onSetCurrentContact } = UseChatContext();
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
                                        <small className="text-slate-700">Pengguna</small>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </Card>
                <Card className="grow rounded-lg px-3 flex flex-col">
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
                                <small className="text-slate-700">Pengguna</small>
                            </div>
                        </div>
                        <hr className="my-3" />
                    </div>
                    <div className="grow flex items-end">
                        <div className="flex flex-col gap-1 w-full">
                            {chat.map((item, index) => {
                                return (
                                    <div key={index} className={`flex ${item.from_id === user?.auth?.user?.id ? 'justify-start' : 'justify-end'}`}>
                                        {item.from_id === user?.auth?.user?.id && (
                                            <div className="flex gap-1">
                                                <div className="bg-stone-50 border w-7 h-7 rounded-lg overflow-hidden flex justify-center items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="text-stone-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M9 10l.01 0" /><path d="M15 10l.01 0" /><path d="M9.5 15a3.5 3.5 0 0 0 5 0" /></svg>
                                                </div>
                                                <div className="flex flex-col bg-white border rounded-lg px-3 py-2">
                                                    <span className="">{item.message}</span>
                                                    <div className="flex justify-start">
                                                        <small>{timeFormatter(item.created_at)}</small>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {item.from_id !== user?.auth?.user?.id && (
                                            <div className="flex gap-1">
                                                <div className="flex flex-col bg-slate-100 border rounded-lg px-3 py-2">
                                                    <span className="">{item.message}</span>
                                                    <div className="flex justify-end">
                                                        <small>{timeFormatter(item.created_at)}</small>
                                                    </div>
                                                </div>
                                                <div className="bg-stone-50 border w-7 h-7 rounded-lg overflow-hidden flex justify-center items-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="text-stone-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M9 10l.01 0" /><path d="M15 10l.01 0" /><path d="M9.5 15a3.5 3.5 0 0 0 5 0" /></svg>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </Card>
            </div>
        </Content>
    );
}

export default ChatPage;