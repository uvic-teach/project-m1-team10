/**
 * Date: DD/MM/YYYY
 */
export type Date = `${number}/${number}/${number}`
// export interface Date {
//     day: number
//     month: number
//     year: number
// }

/**
 * Time: HH:MM in 24 hour time
 */
export type Time = `${number}:${number}`
// export interface Time {
//     hour: number
//     minute: number
// }


/**
 * Schedule
 */
export interface Schedule {
    doctor: number
    hoursStart: Time
    hoursEnd: Time
    days: String[]
    holidays?: Date
}