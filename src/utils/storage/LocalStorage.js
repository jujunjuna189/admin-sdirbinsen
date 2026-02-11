export const getLocalToken = () => {
    return JSON.parse(localStorage.getItem('sdirbinsen.user'))?.authFromServer?.data ?? '';
}

export const setLocalUser = (value) => {
    localStorage.setItem('sdirbinsen.user', JSON.stringify(value));
}

export const getLocalUser = () => {
    return JSON.parse(localStorage.getItem('sdirbinsen.user'));
}

export const clearLocal = () => {
    localStorage.clear();
}

// Message
export const setLocalMessagePending = (value) => {
    localStorage.setItem('sdirbinsen.message_pending', JSON.stringify(value));
}

export const getLocalMessagePending = () => {
    return JSON.parse(localStorage.getItem('sdirbinsen.message_pending')) ?? [];
}

// Global Page State Persistence
export const setPageState = (key, value) => {
    localStorage.setItem(`sdirbinsen.page_state.${key}`, JSON.stringify(value));
}

export const getPageState = (key) => {
    const data = localStorage.getItem(`sdirbinsen.page_state.${key}`);
    return data ? JSON.parse(data) : null;
}