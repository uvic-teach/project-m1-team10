/**
 * For medical professionals to submit their availability to Appointments
 */

/**
 * Date: DD/MM/YYYY
 * TODO: this should probably be moved to a more generic file
 */
export interface Date {
    day: number
    month: number
    year: number
}

/**
 * Time: HH/MM in 24 hour time
 * TODO: this should probably be moved to a more generic file
 */
export interface Time {
    hour: number
    minute: number
}

/**
 * Days of the week
 */
// export enum DaysOfTheWeek {
//     Sunday,
//     Monday,
//     Tuesday,
//     Thursday,
//     Friday,
//     Saturday
// }

/**
 * Schedule
 * Types TBD
 */
export interface Schedule {
    doctor: number
    hoursStart: Time
    hoursEnd: Time
    days: String[]
    holidays?: Date
}