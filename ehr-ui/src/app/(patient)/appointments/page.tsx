"use client";

import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import { use, useContext, useEffect, useState } from "react";
import { useAuth } from "../../../../context/AuthContext";

type appointment = {
    id: number;
    date: string;
    start: string;
    end: string;
    method: "IN" | "VI" | "PH";
    patient: number;
    doctor: number;
    description: null | string;
};

type token = {
    jwt: string;
    phn: number;
    name: string;
};

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
    const [appointments, setAppointments] = useState<Array<appointment>>([]);

    let { user } = useAuth();

    useEffect(() => {
        if (!user) return;
        let url = `https://appointment-service.onrender.com/appointments/?patient=${user.phn}`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => setAppointments(data));
    }, [user]);

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
