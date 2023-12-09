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
import { Button } from "@/components/ui/button";

type AppointmentType = "upcoming" | "past";

// straight copy and pasted from the patient appointment page because I dont want to make a component rn

export default function Page() {
    let { upcomingApps, pastApps, updateAppointments } = useAppointment();
    let [appType, setAppType] = useState<AppointmentType>("upcoming");

    useEffect(() => {
        updateAppointments();
    }, [updateAppointments]);

    return (
        <>
            <div className="flex justify-between pb-4">
                <button
                    className={`${
                        appType === "upcoming"
                            ? "text-black bg-slate-300 hover:bg-slate-400"
                            : "text-white bg-custom-blue hover:bg-custom-blue-hover"
                    }  text-xl w-full py-2`}
                    onClick={(e) => setAppType("upcoming")}
                >
                    Upcoming
                </button>
                <button
                    className={`${
                        appType === "past"
                            ? "text-black bg-slate-300 hover:bg-slate-400"
                            : "text-white bg-custom-blue hover:bg-custom-blue-hover"
                    }  text-xl w-full py-2`}
                    onClick={(e) => setAppType("past")}
                >
                    Past
                </button>
            </div>
            <div className="flex flex-col items-center w-full">
                {(appType === "upcoming" ? upcomingApps : pastApps).map(
                    (appointment) => (
                        <div
                            key={appointment.id}
                            className="bg-white shadow-md rounded px-8 pt-6 w-1/3 mb-4 text-black"
                        >
                            <p className="font-bold text-xl">{`${appointment.patient_name}`}</p>
                            <p>{`${formatDateFromAPI(
                                appointment.date
                            )} ${formatTime(appointment.start)}`}</p>
                            <p className="text-sm">
                                {appointmentMethods[appointment.method]}{" "}
                                appointment
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
                    )
                )}
            </div>
        </>
    );
}
