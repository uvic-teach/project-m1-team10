"use client";

import "../globals.css";
import Sidebar from "@/components/sidebar";
import * as React from "react";
import { patientNavItems } from "./patientNavItems";
import NavBar from "@/components/navbar";

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
            <NavBar home="patient-dashboard" />
            <div className="flex flex-col md:flex-row flex-1">
                <Sidebar SideBarItems={patientNavItems} />
                <main className="flex-1 m-4">{children}</main>
            </div>
        </>
    );
}
