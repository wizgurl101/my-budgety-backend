export const GetDateOfFirstDayOfCurrentMonth = () => {
    const date = new Date();
    date.setDate(1);
    date.setHours(0, 0, 0, 0); // Set the time to 00:00:00

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed in JavaScript

    return `${year}-${month}-01`;
}