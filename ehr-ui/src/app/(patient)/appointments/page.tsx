"use client";

import { use, useContext, useEffect, useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import { useTest } from "../../../../context/TestContext";

function formatDate(dateString: string) {
    const [day, month, year] = dateString.split("/");

    const date = new Date(Number(year), Number(month) - 1, Number(day));

    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

function formatTime(timeString: string) {
    const [hour, minute] = timeString.split(":");
    if (Number(hour) > 12) {
        return `${Number(hour) - 12}:${minute} PM`;
    } else {
        return `${hour}:${minute} AM`;
    }
}

const appointmentMethods = {
    IN: "In-Person",
    VI: "Video",
    PH: "Phone",
};

export default function Page() {
    let { appointments } = useTest();

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
                                <p className="font-bold text-xl">{`Doctor ${appointment.doctor}`}</p>
                                <p>{`${formatDate(
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
