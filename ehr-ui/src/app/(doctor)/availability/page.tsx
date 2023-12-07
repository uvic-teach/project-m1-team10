"use client";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useState } from "react";
import DatePicker from "react-multi-date-picker";
import DatePanel from "react-multi-date-picker/plugins/date_panel";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

    const days = [
        {
            day: "Mon",
            id: "monday",
            name: "monday",
            label: "Monday"
        },

        {
            day: "Tue",
            id: "tuesday",
            name: "tuesday",
            label: "Tuesday"
        },

        {
            day: "Wed",
            id: "wednesday",
            name: "wednesday",
            label: "Wednesay"
        },

        {
            day: "Thur",
            id: "thursday",
            name: "thursday",
            label: "Thursday"
        },

        {
            day: "Fri",
            id: "monday",
            name: "monday",
            label: "Monday"
        },

        {
            day: "Sat",
            id: "saturday",
            name: "saturday",
            label: "Saturday"
        },
        
        {
            day: "Sun",
            id: "sunday",
            name: "sunday",
            label: "Sunday"
        }
    ]

    const [values, setValues] = useState()
    

    return (
        <>
            
            <div className="flex h-full flex-col justify-center items-center bg-blue-300 rounded-md">
                <div className="bg-red-400 rounded-md lg:py-12 lg:px-6">
                    <form>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="start-time" className="block text-sm font-medium leading-6 text-gray-900">
                                    Start Time
                                </label>

                                <div className="mt-2">
                                    <input
                                    type="time"
                                    name="start-time"
                                    id="start-time"
                                    placeholder=""
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="end-time" className="block text-sm font-medium leading-6 text-gray-900">
                                    End Time
                                </label>
                                <div className="mt-2">
                                    <input
                                    type="time"
                                    name="end-time"
                                    id="end-time"
                                    placeholder=""
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>

                        </div>

                        <div className="display:inline">
                            <>
                            {days.map((item, index) => {
                                return(
                                    <>
                                        <input
                                            type="checkbox"
                                            id={item.id}
                                            name={item.name}
                                            className="m-4" 
                                            key={index}
                                        />
                                        <label key={index} htmlFor={item.id}>{item.day}</label>
                                    </>
                                )
                            })}
                            </>

                        </div>

                        <div className="justify-center">
                            <DatePicker 
                                multiple
                                format="MMMM DD YYYY"
                                plugins={[<DatePanel />]}
                                value={values}
                                onChange={setValues}
                            />
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button type="button" className="rounded-md bg-white px-3 py-2 text-sm font-semibold shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-gray-900">
                                <Link href='/doctor-dashboard'>Cancel</Link>
                            </button>

                            <button
                            type="submit"
                            className="rounded-md bg-custom-blue px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-custom-blue/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Save
                            </button>
                        </div>




                    </form>
                </div>
                
            </div>
                        
        </>
    );
}