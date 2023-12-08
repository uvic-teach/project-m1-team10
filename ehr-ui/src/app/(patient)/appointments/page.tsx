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
import AppointmentEdit from "@/components/appointmentEditor";
import AppointmentDelete from "@/components/appointmentDelete";

export default function Page() {
    let { appointments } = useAppointment();

    return (
        <>
            <div className="flex flex-col items-center w-full">
                {appointments.map((appointment) => (
                    <div
                        key={appointment.id}
                        className="bg-white shadow-md rounded px-8 pt-6 w-1/3 mb-4 text-black"
                    >
                        <p className="font-bold text-xl">{`${
                            doctors[appointment.doctor]
                                ? doctors[appointment.doctor].name
                                : `Dr. ${appointment.doctor}`
                        }`}</p>
                        <p>{`${formatDateFromAPI(
                            appointment.date
                        )} ${formatTime(appointment.start)}`}</p>
                        <p className="text-sm">
                            {appointmentMethods[appointment.method]} appointment
                        </p>
                        {appointment.description && (
                            <>
                                <br />
                                <p className="font-normal pb-4">
                                    Description: {appointment.description}
                                </p>
                            </>
                        )}
                        <div className="flex justify-between align-middle content-center pb-2">
                            <AppointmentDelete appointment={appointment} />
                            <AppointmentEdit appointment={appointment} />
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}
