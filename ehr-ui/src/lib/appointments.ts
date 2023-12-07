export function formatDateFromAPI(dateString: string) {
    const [day, month, year] = dateString.split("/");

    const date = new Date(Number(year), Number(month) - 1, Number(day));

    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

export function formatDateForAPI(date: Date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
}

export function formatTime(timeString: string) {
    const [hour, minute] = timeString.split(":");
    if (Number(hour) > 12) {
        return `${Number(hour) - 12}:${minute} PM`;
    } else {
        return `${hour}:${minute} AM`;
    }
}

export const appointmentMethods = {
    IN: "In-Person",
    VI: "Video",
    PH: "Phone",
};
