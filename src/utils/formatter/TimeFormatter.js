export const timeFormatter = (value) => {
    const date = new Date(value);
    return `${setZero(date.getHours())}:${setZero(date.getMinutes())}`;
}

const setZero = (value) => {
    return value < 10 ? `0${value}` : value;
}