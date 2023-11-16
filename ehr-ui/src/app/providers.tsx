"use client";

import AuthProvider from "../../context/AuthContext";

// the need of this file explained here https://vercel.com/guides/react-context-state-management-nextjs
export function Providers({ children }: { children: React.ReactNode }) {
    return <AuthProvider>{children}</AuthProvider>;
}