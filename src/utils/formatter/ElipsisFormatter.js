export const ElipsisFormatter = (text, maxLength = 26) => {
    if (text.length > maxLength) {
        return text.slice(0, maxLength - 3) + '...';
    }
    return text;
}