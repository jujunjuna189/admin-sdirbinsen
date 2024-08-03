export const timeFormatter = (value) => {
    const date = new Date(value);
    return `${setZero(date.getHours())}:${setZero(date.getMinutes())}`;
}

export const timeFormatterV2 = (value) => {
    const date = new Date(value);
    return `${setZero(date.getDate())}-${setZero(date.getMonth())}-${setZero(date.getFullYear())} ${setZero(date.getHours())}:${setZero(date.getMinutes())}:${setZero(date.getSeconds())}:${setZero(date.getMilliseconds())}`;
}

const setZero = (value) => {
    return value < 10 ? `0${value}` : value;
}