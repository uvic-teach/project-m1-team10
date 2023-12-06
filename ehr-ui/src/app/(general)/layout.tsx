"use client";

import "../globals.css";
import * as React from "react";
import { Providers } from "../providers";

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
        <div className="w-screen h-screen flex place-content-center justify-center items-center">
            {children}
        </div>
    );
}
