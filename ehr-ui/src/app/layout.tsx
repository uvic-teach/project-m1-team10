import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "../components/navbar";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "EHR",
    description: "Electronic health record system",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <Providers>
            <html lang="en">
                <body
                    className={`${inter.className} bg-slate-600 text-slate-100 mx-auto p-4`}
                >
                    <Navbar />
                    <div className="flex flex-col items-center w-auto mt-8">
                        {children}
                    </div>
                </body>
            </html>
        </Providers>
    );
}