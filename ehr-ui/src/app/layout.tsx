import "./globals.css";
import { Inter } from "next/font/google";
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
                <body className="bg-custom-blue">{children}</body>
            </html>
        </Providers>
    );
}
