import axios from "axios";
import { API_JABATAN_GET, API_PERSONIL_LIST_GET } from "../config/api";

export const getJabatanPersonilRequest = async () => {
    // const user = getLocalUser();
    try {
        const response = await axios.get(`${API_PERSONIL_LIST_GET}/jabatan`, {
            headers: {
                Authorization: `bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2JhY2tlbmQuc2RpcmJpbnNlbi5jb20vYXBpL3YxL2F1dGgvbG9naW4iLCJpYXQiOjE2ODk3NDA1OTMsImV4cCI6MTY4OTgyNjk5MywibmJmIjoxNjg5NzQwNTkzLCJqdGkiOiJnQkZIUDY4OXUzNjBqWkFUIiwic3ViIjoiNSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjciLCJ1c2VyIjp7InVzZXJfaWQiOjUsInJvbGVfaWQiOiIxIn19.NmhGNPK-EpJfPUZMxlhl8JUiB2u4_y9K5ozPiM3uxl4`,
            },
        });
        return response.data.list_data.jabatan;
    } catch (error) {
        console.error("Error fetching items:", error);
    }
};

export const getJabatanRequest = async ({ jabatan_id = null }) => {
    // const user = getLocalUser();
    try {
        var filter = '';

        if (jabatan_id != null) {
            filter += `?id=${jabatan_id}`;
        }

        const response = await axios.get(`${API_JABATAN_GET}${filter}`, {
            headers: {
                Authorization: `bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2JhY2tlbmQuc2RpcmJpbnNlbi5jb20vYXBpL3YxL2F1dGgvbG9naW4iLCJpYXQiOjE2ODk3NDA1OTMsImV4cCI6MTY4OTgyNjk5MywibmJmIjoxNjg5NzQwNTkzLCJqdGkiOiJnQkZIUDY4OXUzNjBqWkFUIiwic3ViIjoiNSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjciLCJ1c2VyIjp7InVzZXJfaWQiOjUsInJvbGVfaWQiOiIxIn19.NmhGNPK-EpJfPUZMxlhl8JUiB2u4_y9K5ozPiM3uxl4`,
            },
        });
        return response.data.list_data.jabatan;
    } catch (error) {
        console.error("Error fetching items:", error);
    }
};

export const createJabatanRequest = async ({ body = {} }) => {
    // const user = getLocalUser();
    try {
        const response = await axios.post(API_JABATAN_GET, body, {
            headers: {
                Authorization: `bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2JhY2tlbmQuc2RpcmJpbnNlbi5jb20vYXBpL3YxL2F1dGgvbG9naW4iLCJpYXQiOjE2ODk3NDA1OTMsImV4cCI6MTY4OTgyNjk5MywibmJmIjoxNjg5NzQwNTkzLCJqdGkiOiJnQkZIUDY4OXUzNjBqWkFUIiwic3ViIjoiNSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjciLCJ1c2VyIjp7InVzZXJfaWQiOjUsInJvbGVfaWQiOiIxIn19.NmhGNPK-EpJfPUZMxlhl8JUiB2u4_y9K5ozPiM3uxl4`,
            },
        });
        return response.data.list_data.jabatan;
    } catch (error) {
        return error?.response?.data?.list_data ?? undefined;
    }
};

export const updateJabatanRequest = async ({ jabatan_id = null, body = {} }) => {
    // const user = getLocalUser();
    try {
        const response = await axios.post(`${API_JABATAN_GET}/${jabatan_id}`, body, {
            headers: {
                Authorization: `bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2JhY2tlbmQuc2RpcmJpbnNlbi5jb20vYXBpL3YxL2F1dGgvbG9naW4iLCJpYXQiOjE2ODk3NDA1OTMsImV4cCI6MTY4OTgyNjk5MywibmJmIjoxNjg5NzQwNTkzLCJqdGkiOiJnQkZIUDY4OXUzNjBqWkFUIiwic3ViIjoiNSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjciLCJ1c2VyIjp7InVzZXJfaWQiOjUsInJvbGVfaWQiOiIxIn19.NmhGNPK-EpJfPUZMxlhl8JUiB2u4_y9K5ozPiM3uxl4`,
            },
        });
        return response.data.list_data.jabatan;
    } catch (error) {
        console.log(error?.response);
        return error?.response?.data?.list_data ?? undefined;
    }
};

export const deleteJabatanRequest = async ({ jabatan_id = null }) => {
    // const user = getLocalUser();
    try {
        const response = await axios.delete(`${API_JABATAN_GET}/${jabatan_id}`, {
            headers: {
                Authorization: `bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2JhY2tlbmQuc2RpcmJpbnNlbi5jb20vYXBpL3YxL2F1dGgvbG9naW4iLCJpYXQiOjE2ODk3NDA1OTMsImV4cCI6MTY4OTgyNjk5MywibmJmIjoxNjg5NzQwNTkzLCJqdGkiOiJnQkZIUDY4OXUzNjBqWkFUIiwic3ViIjoiNSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjciLCJ1c2VyIjp7InVzZXJfaWQiOjUsInJvbGVfaWQiOiIxIn19.NmhGNPK-EpJfPUZMxlhl8JUiB2u4_y9K5ozPiM3uxl4`,
            },
        });
        return response.data.list_data.jabatan;
    } catch (error) {
        return error?.response?.data?.list_data ?? undefined;
    }
};