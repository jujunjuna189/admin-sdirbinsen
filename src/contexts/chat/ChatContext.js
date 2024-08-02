import { createContext, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createChatRequest, getChatRequest } from "../../api/ChatRequest";
import { getUserRequest } from "../../api/UserRequest";
import { dateFormatterV3, getLocalMessagePending, getLocalUser, setLocalMessagePending } from "../../utils";

const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const user = getLocalUser();
    const messageReff = useRef(null)
    const [contact, setContact] = useState([]);
    const [currentContact, setCurrentContact] = useState({});
    const [chat, setChat] = useState([]);
    const [controller, setController] = useState([]);
    const [tab, setTab] = useState([
        {
            title: 'Sudah Dichat',
            isActive: true,
        },
        {
            title: 'Pengguna',
            isActive: false,
        }
    ]);

    const messageContainerScrollDown = () => {
        if (messageReff.current) {
            messageReff.current.scrollTop = messageReff.current.scrollHeight;
        }
    }

    const onSetController = (props) => {
        setController([{ ...props, from_id: user.auth.user.id, to_id: currentContact.id }]);
    }

    const contactFormat = ({ id, picture, name }) => {
        return { id: id, picture: picture, name: name };
    }

    const messageFormat = ({ id, attachment, message, from_id, to_id, created_at, status }) => {
        return { id: parseInt(id), attachment: attachment, message: message, from_id: parseInt(from_id), to_id: parseInt(to_id), created_at: created_at, status: status };
    }

    const onGetUser = async () => {
        await getUserRequest().then((res) => {
            let contact = [];
            res.data.forEach((item) => {
                contact.push(contactFormat({ ...item }));
            });
            setContact(contact);
        });
    }

    const onTabSwitch = (indexItem) => {
        tab.forEach((item, index) => {
            tab[index].isActive = false;
        });

        tab[indexItem].isActive = true;
        setTab([...tab]);
        initial(indexItem);
    };

    const initial = (index) => {
        switch (index) {
            case 1:
                onGetUser();
                break;
            default:
                break;
        }
    }

    const onSetCurrentContact = (index) => {
        setCurrentContact(contact[index]);
        onGetChat(contact[index]);
    }

    const onGetChat = async (currentContact) => {
        await getChatRequest({ from_id: user.auth.user.id, to_id: currentContact.id }).then((res) => {
            let chatData = [];
            res.data.forEach((item) => {
                chatData.push(messageFormat({ ...item }));
            });
            setChat(chatData);
        });
    }

    const onSend = async () => {
        // Created id
        if (controller?.[0]?.message !== undefined) {
            let id = (getLocalMessagePending()?.[getLocalMessagePending().length - 1]?.id ?? 0) + 1;
            let message = messageFormat({ id: id, attachment: controller?.[0]?.attachment, message: controller?.[0]?.message, from_id: user.auth.user.id, to_id: currentContact.id, created_at: dateFormatterV3(new Date()), status: 'Mengirim...' });
            setLocalMessagePending([...getLocalMessagePending(), message]);
            chat.push(message);
            setChat([...chat]);
            setController([]);
            await createChatRequest({ body: { ...controller[0] } }).then((res) => {
                let chatPending = [...getLocalMessagePending()];
                let chatPendingIndex = chatPending.findIndex((item) => item.id === id && item.from_id === user.auth.user.id && item.to_id === currentContact.id);
                chatPending[chatPendingIndex] = messageFormat({ ...res });
                // Save local data
                setLocalMessagePending(chatPending);

                // search message before update local storage
                let filterData = chat.filter((item) => item.status !== 'Mengirim...');
                let chatData = [...filterData, ...getLocalMessagePending()];
                setChat([...chatData]);
                if (getLocalMessagePending()[getLocalMessagePending().length - 1].status !== "Mengirim...") setLocalMessagePending([]);
            });
        }
    }

    useEffect(() => {
        messageContainerScrollDown();
    }, [chat]);

    useEffect(() => {
        onTabSwitch(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ChatContext.Provider value={{ navigation, messageReff, user, tab, contact, currentContact, chat, controller, onTabSwitch, onSetCurrentContact, onSetController, onSend }}>
            {children}
        </ChatContext.Provider>
    );
}

export const UseChatContext = () => {
    return useContext(ChatContext);
}