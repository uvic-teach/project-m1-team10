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

    const updateAppointments = useCallback(async () => {
        if (!user) return;
        let url = `https://appointment-service.onrender.com/appointments/?patient=${user.phn}`;

        const response = await fetch(url);
        const allAppointments: Appointment[] = await response.json();

        console.log(allAppointments, "allAppointments");

        const now = new Date();
        const yesterday = new Date(now);
        yesterday.setDate(now.getDate() - 1);
        let upcoming = allAppointments.filter((appointment) => {
            let date = new Date(appointment.proper_date);
            return date >= yesterday;
        });
        console.log(upcoming, "upcoming");
        setUpcomingApps(upcoming);

        let past = allAppointments.filter((appointment) => {
            let date = new Date(appointment.proper_date);
            return date < yesterday;
        });
        console.log("past", past);
        setPastApps(past);
    }, [user]);

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
