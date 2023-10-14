/**
 * For medical professionals to submit their availability to Appointments
 */

/**
 * Date: DD/MM/YYYY
 * TODO: this should probably be moved to a more generic file
 */
interface Date {
    day: number
    month: number
    year: number
}

/**
 * Time: HH/MM in 24 hour time
 * TODO: this should probably be moved to a more generic file
 */
interface Time {
    hour: number
    minute: number
}

/**
 * Days of the week
 */
enum DaysOfTheWeek {
    Sunday,
    Monday,
    Tuesday,
    Thursday,
    Friday,
    Saturday
}

/**
 * Schedule
 * Types TBD
 */
interface Schedule {
    doctor: number
    hoursStart: Time
    hoursEnd: Time
    days: DaysOfTheWeek[]
    holidays?: Date
}

export function submitAvailability() {
    return 0;
}