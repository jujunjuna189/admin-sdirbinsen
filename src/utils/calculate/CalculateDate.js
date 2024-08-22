export const calculateDifferenceDate = (startDateString, endDateString) => {
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);

    let yearDifference = endDate.getFullYear() - startDate.getFullYear();
    let monthDifference = endDate.getMonth() - startDate.getMonth();

    if (monthDifference < 0) {
        yearDifference -= 1;
        monthDifference += 12;
    }

    console.log(startDateString);
    return {
        years: yearDifference,
        months: monthDifference
    };
};