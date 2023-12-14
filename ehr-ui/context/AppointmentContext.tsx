"use client";

import { useRouter } from "next/navigation";
import {
    createContext,
    useState,
    useContext,
    useEffect,
    useCallback,
} from "react";
import { useAuth } from "./AuthContext";
import { Appointment } from "@/lib/appointments";
import { doctor } from "../src/lib/auth";

type ContextProps = {
    upcomingApps: Array<Appointment>;
    pastApps: Array<Appointment>;
    updateAppointments: () => void;
};

const AppointmentContext = createContext<ContextProps | null>(null);

export default function AppointmentProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [upcomingApps, setUpcomingApps] = useState<Array<Appointment>>([]);
    const [pastApps, setPastApps] = useState<Array<Appointment>>([]);

    const { user } = useAuth();
    //const { data: session, status } = useSession();
    //const doctor = session?.user;

    const separateAppointments = (appointments: Appointment[]) => {
        const now = new Date();
        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);
        let upcoming = appointments.filter((appointment) => {
            let date = new Date(appointment.proper_date);
            return date >= yesterday;
        });
        console.log(upcoming, "upcoming");
        setUpcomingApps(upcoming);

        let past = appointments.filter((appointment) => {
            let date = new Date(appointment.proper_date);
            return date < yesterday;
        });
        console.log("past", past);
        setPastApps(past);
    };

    const updateAppointments = useCallback(async () => {
        if (!user && !doctor) return;
        let param: string = "";
        if (user) {
            param = `patient=${user.phn}`;
        } else if (doctor) {
            param = `doctor=${doctor.id}`;
        }
        let url = `https://appointment-service.onrender.com/appointments/?${param}`;

        const response = await fetch(url);
        const allAppointments: Appointment[] = await response.json();

        // barely any idea how this works. from copilot
        // gets the patient name for each appointment instead of just the id
        const patientPromises = allAppointments.map(async (appointment) => {
            const patientResponse = await fetch(
                `https://log-in-microservice.vercel.app/api/users/${appointment.patient}`
            );
            return patientResponse.json();
        });

        const patients = await Promise.all(patientPromises);

        const appointmentsWithPatientNames = allAppointments.map(
            (appointment, index) => ({
                ...appointment,
                patient_name: patients[index].name,
            })
        );

        // split appointments into sepearate arrays for upcoming and past
        separateAppointments(appointmentsWithPatientNames);
    }, [user, doctor]);

    useEffect(() => {
        updateAppointments();
    }, [updateAppointments]);

    let contextData = {
        upcomingApps: upcomingApps,
        pastApps: pastApps,
        updateAppointments: updateAppointments,
    };

    return (
        <AppointmentContext.Provider value={contextData}>
            {children}
        </AppointmentContext.Provider>
    );
}

export function useAppointment() {
    const context = useContext(AppointmentContext);
    if (!context) {
        throw new Error("useTest must be used within an AppointmentProvider");
    }
    return context;
}
