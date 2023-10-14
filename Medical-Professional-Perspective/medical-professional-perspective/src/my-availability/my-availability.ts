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
 * Schedule
 * Types TBD
 */
interface Schedule {
    doctor: number
    hoursStart: Time
    hoursEnd: Time
    days: String[]
    holidays?: Date
}