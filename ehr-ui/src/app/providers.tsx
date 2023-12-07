"use client";

import AuthProvider from "../../context/AuthContext";
import TestProvider from "../../context/TestContext";

// the need of this file explained here https://vercel.com/guides/react-context-state-management-nextjs
export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider>
            <TestProvider>{children}</TestProvider>
        </AuthProvider>
    );
}
