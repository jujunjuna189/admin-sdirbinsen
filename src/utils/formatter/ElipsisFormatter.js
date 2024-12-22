export const ElipsisFormatter = (text, maxLength = 26) => {
    console.log(text);
    if (text?.length > maxLength) {
        return text.slice(0, maxLength - 3) + '...';
    }
    return text;
}