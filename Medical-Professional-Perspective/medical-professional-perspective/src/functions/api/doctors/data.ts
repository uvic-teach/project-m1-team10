import { Date, Time } from "../types";

const doctors = [
    {
        id: 1,
        hoursStart: {hour: 9, minute: 0} as Time,
        hoursEnd: {hour: 17, minute: 0} as Time,
        days: ["Monday", "Tuesday", "Wednesday"],
        holidays: null
    },
    {
        id: 2,
        hoursStart: {hour: 8, minute: 0} as Time,
        hoursEnd: {hour: 15, minute: 0} as Time,
        days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        holidays: {day: 30, month: 9, year: 2023} as Date
    },
    {
        id: 3,
        hoursStart: {hour: 10, minute: 0} as Time,
        hoursEnd: {hour: 16, minute: 0} as Time,
        days: ["Monday", "Tuesday", "Saturday"],
        holidays: null
    }
]

export default doctors;