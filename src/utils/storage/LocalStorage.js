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