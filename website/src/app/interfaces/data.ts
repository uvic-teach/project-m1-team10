import { Date, Time } from "./types";

const doctors = [
    {
        id: 1,
        hoursStart: "09:00" as Time,
        hoursEnd: "17:00" as Time,
        days: ["Monday", "Tuesday", "Wednesday"],
        holidays: null
    },
    {
        id: 2,
        hoursStart: "08:00" as Time,
        hoursEnd: "15:00" as Time,
        days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        holidays: "30/09/2023" as Date
    },
    {
        id: 3,
        hoursStart: "10:00" as Time,
        hoursEnd: "16:30" as Time,
        days: ["Monday", "Tuesday", "Saturday"],
        holidays: null
    }
]

export default doctors;