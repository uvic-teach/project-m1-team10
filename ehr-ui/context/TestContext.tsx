"use client";

import { useRouter } from "next/navigation";
import { createContext, useState, useContext, useEffect } from "react";
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
};

const TestContext = createContext<ContextProps | null>(null);

export default function TestProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [appointments, setAppointments] = useState<Array<appointment>>([]);
    const { user } = useAuth();

    useEffect(() => {
        if (!user) return;
        let url = `https://appointment-service.onrender.com/appointments/?patient=${user.phn}`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => setAppointments(data));
    }, [user]);

    let contextData = {
        appointments: appointments,
    };

    return (
        <TestContext.Provider value={contextData}>
            {children}
        </TestContext.Provider>
    );
}

export function useTest() {
    const context = useContext(TestContext);
    if (!context) {
        throw new Error("useTest must be used within a TestProvider");
    }
    return context;
}
