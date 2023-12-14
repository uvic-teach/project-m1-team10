"use client";

import "../globals.css";
import Sidebar from "@/components/sidebar";

import * as React from "react";
import { doctorNavItems } from "./doctorNavItems";
import NavBar from "@/components/navbar";
import NextAuthProvider from "./nextauth-providers";

const metadata = {
    title: "Patient Webpages",
    description: "Patient Webpges",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <NextAuthProvider>
                <NavBar home="doctor-dashboard" />

                <div className="flex flex-col md:flex-row flex-1">
                    <Sidebar SideBarItems={doctorNavItems} />
                    <main className="flex-1 m-4">{children}</main>
                </div>
            </NextAuthProvider>
        </>
    );
}
