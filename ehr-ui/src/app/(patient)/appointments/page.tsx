"use client";

import { use, useContext, useEffect, useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import { useAppointment } from "../../../../context/AppointmentContext";
import {
    appointmentMethods,
    formatDateFromAPI,
    formatTime,
} from "@/lib/appointments";
import { doctors } from "@/lib/hardcoded_values";

export default function Page() {
    let { appointments } = useAppointment();

    return (
        <>
            <div className="flex flex-col items-center">
                <ul>
                    {appointments.map((appointment) => (
                        <div
                            key={appointment.id}
                            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-sm text-black"
                        >
                            <li>
                                <p className="font-bold text-xl">{`${
                                    doctors[appointment.doctor]
                                        ? doctors[appointment.doctor].name
                                        : `Dr. ${appointment.doctor}`
                                }`}</p>
                                <p>{`${formatDateFromAPI(
                                    appointment.date
                                )} ${formatTime(appointment.start)}`}</p>
                                <p>
                                    {appointmentMethods[appointment.method]}{" "}
                                    appointment
                                </p>
                                {appointment.description && (
                                    <>
                                        <br />
                                        <p className="font-normal">
                                            Description:{" "}
                                            {appointment.description}
                                        </p>
                                    </>
                                )}
                            </li>
                        </div>
                    ))}
                </ul>
            </div>
        </>
    );
}
