// month is 0 indexed
export const daysInAbsMonth = ({ year, month }) => {
    return new Date(year, month + 1, 0).getDate()
}

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

export const nextAbsMonth = ({ month, year }) => {
    if (month == 11) {
        return {
            month: 0,
            year: year + 1,
        }
    } else {
        return {
            month: month + 1,
            year,
        }
    }
}

export const prevAbsMonth = ({ month, year }) => {
    if (month == 0) {
        return {
            month: 11,
            year: year - 1,
        }
    } else {
        return {
            month: month - 1,
            year,
        }
    }
}

export const dayName = ({ month, year, day }) => (
    ["Sunday", "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday"][new Date(year, month, day).getDay()]
)
