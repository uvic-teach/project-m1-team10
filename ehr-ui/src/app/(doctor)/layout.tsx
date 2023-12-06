"use client";

import "../globals.css";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { Providers } from "../providers";
import TestNavBar from "@/components/test-navbar";
import * as React from 'react';
import { doctorNavItems } from "./doctorNavItems";

const metadata = {
    title: 'Patient Webpages',
    description: 'Patient Webpges'
}

export default function RootLayout({ children,}: {children: React.ReactNode }) {
    return (
        <Providers>
            <html lang="en">
                <body className="bg-custom-blue">
                    <TestNavBar home='doctor-dashboard' />

                    <div className="flex flex-col md:flex-row flex-1">
                        <Sidebar SideBarItems={doctorNavItems}/>
                        <main className="flex-1 m-4">
                            {children}
                        </main>

                    </div>
                </body>
            </html>
        </Providers>
            
    );
}
