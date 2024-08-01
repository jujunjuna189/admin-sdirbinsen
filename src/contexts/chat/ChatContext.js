import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getChatRequest } from "../../api/ChatRequest";
import { getUserRequest } from "../../api/UserRequest";
import { getLocalUser } from "../../utils";

const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
    const navigation = useNavigate();
    const user = getLocalUser();
    const [contact, setContact] = useState([]);
    const [currentContact, setCurrentContact] = useState({});
    const [chat, setChat] = useState([]);
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

    const contactFormat = ({ id, picture, name }) => {
        return { id: id, picture: picture, name: name };
    }

    const onGetUser = async () => {
        await getUserRequest().then((res) => {
            let contact = [];
            res.data.forEach((item) => {
                contact.push(contactFormat({ id: item.id, picture: item.picture, name: item.name }));
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
            setChat(res.data);
        });
    }

    useEffect(() => {
        onTabSwitch(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ChatContext.Provider value={{ navigation, user, tab, contact, currentContact, chat, onTabSwitch, onSetCurrentContact }}>
            {children}
        </ChatContext.Provider>
    );
}

export const UseChatContext = () => {
    return useContext(ChatContext);
}