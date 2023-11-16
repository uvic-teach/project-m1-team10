"use client";

import { useContext, useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";

type appointment = {
    id: number;
    date: string;
    start: string;
    end: string;
    method: "IN" | "VI" | "PH";
    patient: number;
    doctor: number;
};

export default function Page() {
    const [appointments, setAppointments] = useState<Array<appointment>>([]);

    let { user } = useAuth();

    useEffect(() => {
        (async () => {
            if (!user) return;
            let url = `https://appointment-service.onrender.com/appointments/?patient=${user.phn}`;
            try {
                const response = await fetch(url, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const appointments = await response.json();
                console.log(appointments);
                setAppointments(appointments);
            } catch (err) {
                console.log(err);
            }
        })();
    });

    return (
        <>
            <h1>
                Hi {user?.name}, you have {appointments.length} upcoming
                appointments
            </h1>
            <ul>
                {appointments.map((appointment) => (
                    <div
                        key={appointment.id}
                        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 text-black"
                    >
                        <li>
                            <p>Date: {appointment.date}</p>
                            <p>Start Time: {appointment.start}</p>
                            <p>End Time: {appointment.end}</p>
                            <p>Method: {appointment.method}</p>
                            <p>Patient ID: {appointment.patient}</p>
                            <p>Doctor ID: {appointment.doctor}</p>
                            <p>
                                Description:{" "}
                                {`Appointment with doctor ${appointment.doctor} on ${appointment.date} at ${appointment.start}`}
                            </p>
                        </li>
                    </div>
                ))}
            </ul>
        </>
    );
}