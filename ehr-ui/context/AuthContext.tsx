"use client";

import { useRouter } from "next/navigation";
import { createContext, useState, SyntheticEvent, useContext } from "react";

type ContextProps = {
    user: User | null;
    loginUser: (e: SyntheticEvent) => void;
    logoutUser: (e: SyntheticEvent) => void;
    registerUser: (e: SyntheticEvent) => void;
};

type User = {
    name: string;
    phn: string;
};

const AuthContext = createContext<ContextProps | null>(null);

const apiURL: string = "https://log-in-microservice.vercel.app/api";

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

    let loginUser = async (e: SyntheticEvent) => {
        e.preventDefault();

        const target = e.target as typeof e.target & {
            phn: { value: number };
            password: { value: string };
        };

        let response = await fetch(`${apiURL}/login`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                phn: target.phn.value,
                password: target.password.value,
            }),
        });

        if (response.ok) {
            let userData = await response.json();
            console.log(userData);

            setUser({ ...user, name: userData.name, phn: userData.phn });
            console.log(user);
            router.push("/patient-dashboard");
        } else {
            console.log("Login failed.");
        }
    };

    let registerUser = async (e: SyntheticEvent) => {
        e.preventDefault();

        const target = e.target as typeof e.target & {
            phn: { value: number };
            name: { value: string };
            password: { value: string };
        };

        let response = await fetch(`${apiURL}/register`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                phn: target.phn.value,
                name: target.name.value,
                password: target.password.value,
            }),
        });
        let userData = await response.json();

        setUser({ ...user, name: userData.name, phn: userData.phn });

        if (response.ok) {
            router.push("/patient-dashboard");
        } else {
            console.log("Registration failed.");
        }
    };

    let logoutUser = async (e: SyntheticEvent) => {
        e.preventDefault();

        await fetch(`${apiURL}/logout`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        });

        setUser(null);
        router.push("/login");
    };

    let contextData = {
        user: user,
        loginUser: loginUser,
        logoutUser: logoutUser,
        registerUser: registerUser,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
}
