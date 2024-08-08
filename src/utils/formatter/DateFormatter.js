const month = ['Januari', 'Pebruari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

export const dateFormatter = (value) => {
    const date = new Date(value);
    return `${setZero(date.getDate())} ${month[date.getMonth()]} ${date.getFullYear()}`;
}

export const dateFormatterV2 = (value) => {
    const date = new Date(value);
    return `${setZero(date.getFullYear())}-${date.getMonth() + 1}-${date.getDate()}`;
}

export const dateFormatterV3 = (value) => {
    const date = new Date(value);
    // Get the components of the date
    let year = date.getUTCFullYear();
    let month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
    let day = date.getUTCDate().toString().padStart(2, '0');
    let hours = date.getUTCHours().toString().padStart(2, '0');
    let minutes = date.getUTCMinutes().toString().padStart(2, '0');
    let seconds = date.getUTCSeconds().toString().padStart(2, '0');
    let milliseconds = date.getUTCMilliseconds().toString().padStart(3, '0');

    // Create the formatted date string
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
}

export const dateFormatterV4 = (value) => {
    const date = new Date(value);
    return value === undefined ? '' : `${setZero(date.getDate())}-${setZero(date.getMonth())}-${date.getFullYear()}`;
}

const setZero = (value) => {
    return value < 10 ? `0${value}` : value;
}