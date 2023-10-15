/**
 * Date: DD/MM/YYYY
 */
export type Date = `${number}/${number}/${number}`

/**
 * Time: HH:MM in 24 hour time
 */
export type Time = `${number}:${number}`

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