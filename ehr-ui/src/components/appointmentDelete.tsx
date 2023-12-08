"use client";
import { Button } from "@/components/ui/button";
import { Appointment } from "@/lib/appointments";
import { Inter } from "next/font/google";
import { useAppointment } from "../../context/AppointmentContext";

const inter = Inter({ subsets: ["latin"] });

type AppointmentProps = {
    appointment: Appointment;
};

export default function AppointmentDelete({ appointment }: AppointmentProps) {
    const { updateAppointments } = useAppointment();

    let deleteAppointment = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        const response = await fetch(
            `https://appointment-service.onrender.com/appointments/${appointment.id}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            console.error("Failed to delete appointment", response);
        } else {
            updateAppointments();
        }
    };

    return (
        <>
            <Button variant="destructive" onClick={deleteAppointment}>
                Delete
            </Button>
        </>
    );
}
