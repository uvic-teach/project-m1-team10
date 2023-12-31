"use client";

import AuthProvider from "../../context/AuthContext";
import AppointmentProvider from "../../context/AppointmentContext";

// the need of this file explained here https://vercel.com/guides/react-context-state-management-nextjs
export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <AppointmentProvider>{children}</AppointmentProvider>
        </AuthProvider>
    );
}
