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

type ContextProps = {
    appointments: Array<appointment>;
    updateAppointments: () => void;
};

const AppointmentContext = createContext<ContextProps | null>(null);

export default function AppointmentProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [appointments, setAppointments] = useState<Array<appointment>>([]);
    const { user } = useAuth();

    const updateAppointments = useCallback(() => {
        if (!user) return;
        let url = `https://appointment-service.onrender.com/appointments/?patient=${user.phn}`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => setAppointments(data));
    }, [user]);

    useEffect(() => {
        updateAppointments();
    }, [updateAppointments]);

    let contextData = {
        appointments: appointments,
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
