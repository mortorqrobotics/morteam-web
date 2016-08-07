// month is 0 indexed
export const daysInMonth = (year, month) => (
    new Date(year, month + 1, 0).getDate()
)

export const allMonths = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
]

export const showDate = (dateStr) => {
    const date = new Date(dateStr);
    return allMonths[date.getMonth()] +
        " " + date.getDate() +
        ", " + date.getFullYear()
}
