"use client";

import { useRouter } from "next/navigation";
import { createContext, useState, SyntheticEvent, useContext } from "react";

type ContextProps = {
    user: User | null;
    doctor: Doctor | null;
    loginUser: (e: SyntheticEvent) => void;
    logoutUser: (e: SyntheticEvent) => void;
    registerUser: (e: SyntheticEvent) => void;
    loginDoctor: (e: SyntheticEvent) => void;
    logoutDoctor: (e: SyntheticEvent) => void;
};

type User = {
    name: string;
    phn: string;
};

type Doctor = {
    id: number;
}

const AuthContext = createContext<ContextProps | null>(null);

const apiURL: string = "https://log-in-microservice.vercel.app/api";
const doctorApiURL: string = "";

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [doctor, setDoctor] = useState<Doctor | null>(null);

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

            const updatedUser = { name: userData.name, phn: userData.phn };
            setUser(updatedUser);
            console.log(user);
            router.push("/");
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

        if (response.ok) {
            router.push("/login");
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

    let loginDoctor = async (e: SyntheticEvent) => {
        e.preventDefault();

        const target = e.target as typeof e.target & {
            email: { value: string };
            password: { value: string };
        };

        let response = await fetch(`${doctorApiURL}/login`, {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email: target.email.value,
                password: target.password.value,
            }),
        });

        if (response.ok) {
            let doctorData = await response.json();
            console.log(doctorData);

            const updatedDoctor = { id: doctorData.id };
            setDoctor(updatedDoctor);

            console.log(doctor);
            console.log("Doctor logged in");
            router.push("/doctor/home");
        } else {
            console.log("Login failed.");
        }
    }

    let logoutDoctor = (e: SyntheticEvent) => {
        e.preventDefault();

        router.push("/doctor/login");
    }

    let contextData = {
        user: user,
        doctor: doctor,
        loginUser: loginUser,
        logoutUser: logoutUser,
        registerUser: registerUser,
        loginDoctor: loginDoctor,
        logoutDoctor: logoutDoctor,
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
