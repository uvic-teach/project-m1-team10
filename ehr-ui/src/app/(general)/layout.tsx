"use client";

import "../globals.css";
import * as React from 'react';

const metadata = {
    title: 'Patient Webpages',
    description: 'Patient Webpges'
}

export default function RootLayout({ children,}: {children: React.ReactNode }) {
    return (
        
        <html lang="en">
            <body className="bg-custom-blue">

                <div className="justify-center items-center m-10">
                    {children}
                </div>
            </body>
        </html>   
    );
}
