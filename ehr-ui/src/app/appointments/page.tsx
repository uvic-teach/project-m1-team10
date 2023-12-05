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

            <div className="w-full max-w-xs">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <label
                        htmlFor="method"
                        className="block text-gray-700 text-sm font-bold"
                    >
                        Appointment method
                    </label>
                    <select
                        id="method"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="NA">Select a Method:</option>
                        <option value="IN">In person</option>
                        <option value="VI">Virtual</option>
                        <option value="PH">Phone</option>
                    </select>
                    <label
                        className="block text-gray-700 text-sm font-bold"
                        htmlFor="phn"
                    >
                        Doctor
                    </label>
                    <select
                        id="method"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="0">Select a Doctor:</option>
                        <option value="1">Dr. Patterson</option>
                        <option value="2">Dr. House</option>
                        <option value="3">Dr. Smith</option>
                        <option value="4">Dr. Jones</option>
                        <option value="5">Dr. Johnson</option>
                    </select>

                    <label
                        className="block text-gray-700 text-sm font-bold"
                        htmlFor="start"
                    >
                        Start Hour
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        name="password"
                        type="password"
                        placeholder="14:00"
                    />
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
