import axios from "axios";
import { API_PERSONIL_GET } from "../config/api";

export const getPendidikanUmumByPersonilRequest = async ({ personil_id = null }) => {
    // const user = getLocalUser();
    try {
        const response = await axios.get(`${API_PERSONIL_GET}/${personil_id}/pendidikan-umum`, {
            headers: {
                Authorization: `bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2JhY2tlbmQuc2RpcmJpbnNlbi5jb20vYXBpL3YxL2F1dGgvbG9naW4iLCJpYXQiOjE2ODk3NDA1OTMsImV4cCI6MTY4OTgyNjk5MywibmJmIjoxNjg5NzQwNTkzLCJqdGkiOiJnQkZIUDY4OXUzNjBqWkFUIiwic3ViIjoiNSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjciLCJ1c2VyIjp7InVzZXJfaWQiOjUsInJvbGVfaWQiOiIxIn19.NmhGNPK-EpJfPUZMxlhl8JUiB2u4_y9K5ozPiM3uxl4`,
            }
        });
        return response.data.list_data.pendidikan_umum;
    } catch (error) {
        console.error('Error fetching items:', error);
    }
}

export const createPendidikanUmumByPersonilRequest = async ({ personil_id = null, body = {} }) => {
    // const user = getLocalUser();
    try {
        const response = await axios.post(`${API_PERSONIL_GET}/${personil_id}/pendidikan-umum`, body, {
            headers: {
                Authorization: `bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2JhY2tlbmQuc2RpcmJpbnNlbi5jb20vYXBpL3YxL2F1dGgvbG9naW4iLCJpYXQiOjE2ODk3NDA1OTMsImV4cCI6MTY4OTgyNjk5MywibmJmIjoxNjg5NzQwNTkzLCJqdGkiOiJnQkZIUDY4OXUzNjBqWkFUIiwic3ViIjoiNSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjciLCJ1c2VyIjp7InVzZXJfaWQiOjUsInJvbGVfaWQiOiIxIn19.NmhGNPK-EpJfPUZMxlhl8JUiB2u4_y9K5ozPiM3uxl4`,
            }
        });
        return response.data.list_data.pendidikan_umum;
    } catch (error) {
        return error?.response?.data?.list_data ?? undefined;
    }
}