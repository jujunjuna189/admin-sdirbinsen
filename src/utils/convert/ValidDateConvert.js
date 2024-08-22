export const ValidDateConvert = (dateString) => {
    // Split the date string into parts
    const [day, month, year] = dateString.split('-');
    // Rearrange to format "YYYY-MM-DD"
    const formattedDate = `${year}-${month}-${day}`;
    // Create a new Date object
    const dateObject = new Date(formattedDate);
    return dateObject;
}