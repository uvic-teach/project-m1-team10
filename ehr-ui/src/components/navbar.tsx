"use client";

import React, { SyntheticEvent, useContext } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation'
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
    let { logoutUser, user } = useAuth();
    const path = usePathname();

    return (
        <div className="flex justify-between items-center mb-4 w-full md:w-auto">
            <h1 className="text-3xl">
                <Link href="/">E-Health</Link>
            </h1>
            <div className="flex">
                {user && (
                    <Link
                        className="border rounded px-2 py-1 border-slate-300 text-slate-300 hover:bg-slate-700 hover:duration-150"
                        href="/appointments"
                    >
                        Appointments
                    </Link>
                )}
                {!user && (
                    <Link
                        className="border rounded outline-none border-slate-300 mx-1 px-2 py-1 text-slate-300 hover:bg-slate-700 focus-within:bg-slate-700 hover:duration-150"
                        href="/login"
                    >
                        Login
                    </Link>
                )}
                {user && (
                    <button
                        className="border rounded outline-none border-slate-300 mx-1 px-2 py-1 text-slate-300 hover:bg-slate-700 focus-within:bg-slate-700 hover:duration-150"
                        onClick={logoutUser}
                    >
                        Logout
                    </button>
                )}
                {!user && (
                    <Link
                        className="border rounded outline-none mx-1 px-2 py-1 border-slate-300  text-slate-300 hover:bg-slate-700 focus-within:bg-slate-700 hover:duration-150"
                        href="/register"
                    >
                        Register
                    </Link>
                )}
            </div>
        </div>
    );
}