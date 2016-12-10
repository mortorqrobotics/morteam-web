// month is 0 indexed
export const daysInAbsMonth = ({ year, month }) => {
    return new Date(year, month + 1, 0).getDate()
}

export const allMonths = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
]

export const showDate = (date) => {
    date = new Date(date);
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

export function currentAbsMonth() {
    const now = new Date();
    return {
        month: now.getMonth(),
        year: now.getFullYear(),
    }
}

export const dayName = ({ month, year, day }) => (
    ["Sunday", "Monday", "Tuesday", "Wednesday",
        "Thursday", "Friday", "Saturday"][new Date(year, month, day).getDay()]
)

function parseTime(date) {
	let hours = date.getHours();
	let suffix = hours < 12 ? "AM" : "PM";
	hours = (hours + 11) % 12 + 1;
	hours = hours.toString();

	let minutes = date.getMinutes().toString();
	if (minutes.length == 1) {
		minutes = "0" + minutes;
	}

	return hours + ":" + minutes + " " + suffix;
}

export function parseDate(timestamp) {
    let date = new Date(timestamp);
    let now = new Date();
    let result = "";
    let month = date.getMonth();
    let day = date.getDate();
    let year = date.getFullYear();
    let time = parseTime(date);
	if (now.getFullYear() == year) {
		if (now.getDate() == day && now.getMonth() == month) {
			result += "Today";
		} else if (now.getDate() == day + 1 && now.getMonth() == month) {
			result += "Yesterday";
		} else {
			result += allMonths[month] + " " + day;
		}
	} else {
		result += allMonths[month] + " " + day + " " + year;
	}
	result += ", " + time;
	return result;
}
