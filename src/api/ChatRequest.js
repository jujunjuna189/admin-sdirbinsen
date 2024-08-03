import axios from "axios";
import { API_CHAT_GET } from "../config/api";

export const getChatRequest = async ({ from_id = null, to_id = null }) => {
    // const user = getLocalUser();
    try {
        var filter = '';

        from_id && (filter += `?from_id=${from_id}`);
        to_id && (filter += `&to_id=${to_id}`);

        const response = await axios.get(`${API_CHAT_GET}${filter}`, {
            headers: {
                Authorization: `bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2JhY2tlbmQuc2RpcmJpbnNlbi5jb20vYXBpL3YxL2F1dGgvbG9naW4iLCJpYXQiOjE2ODk3NDA1OTMsImV4cCI6MTY4OTgyNjk5MywibmJmIjoxNjg5NzQwNTkzLCJqdGkiOiJnQkZIUDY4OXUzNjBqWkFUIiwic3ViIjoiNSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjciLCJ1c2VyIjp7InVzZXJfaWQiOjUsInJvbGVfaWQiOiIxIn19.NmhGNPK-EpJfPUZMxlhl8JUiB2u4_y9K5ozPiM3uxl4`,
            }
        });
        return response.data.list_data.chat;
    } catch (error) {
        console.error('Error fetching items:', error);
    }
}

export const createChatRequest = async ({ body = {} }) => {
    // const user = getLocalUser();
    try {
        const response = await axios.post(`${API_CHAT_GET}`, body, {
            headers: {
                Authorization: `bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2JhY2tlbmQuc2RpcmJpbnNlbi5jb20vYXBpL3YxL2F1dGgvbG9naW4iLCJpYXQiOjE2ODk3NDA1OTMsImV4cCI6MTY4OTgyNjk5MywibmJmIjoxNjg5NzQwNTkzLCJqdGkiOiJnQkZIUDY4OXUzNjBqWkFUIiwic3ViIjoiNSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjciLCJ1c2VyIjp7InVzZXJfaWQiOjUsInJvbGVfaWQiOiIxIn19.NmhGNPK-EpJfPUZMxlhl8JUiB2u4_y9K5ozPiM3uxl4`,
                "Content-Type": 'multipart/form-data'
            }
        });
        return response.data.list_data.chat;
    } catch (error) {
        return error?.response?.data?.chat ?? undefined;
    }
}

export const downloadChatRequest = async ({ body = {} }) => {
    // const user = getLocalUser();
    try {
        const response = await axios.post(`${API_CHAT_GET}-download`, body, {
            headers: {
                Authorization: `bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2JhY2tlbmQuc2RpcmJpbnNlbi5jb20vYXBpL3YxL2F1dGgvbG9naW4iLCJpYXQiOjE2ODk3NDA1OTMsImV4cCI6MTY4OTgyNjk5MywibmJmIjoxNjg5NzQwNTkzLCJqdGkiOiJnQkZIUDY4OXUzNjBqWkFUIiwic3ViIjoiNSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjciLCJ1c2VyIjp7InVzZXJfaWQiOjUsInJvbGVfaWQiOiIxIn19.NmhGNPK-EpJfPUZMxlhl8JUiB2u4_y9K5ozPiM3uxl4`,
            },
            responseType: 'blob',
        });
        return response;
    } catch (error) {
        return error?.response?.data ?? undefined;
    }
}