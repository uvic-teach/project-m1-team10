"use client";
import { Inter } from "next/font/google";
import { useAppointment } from "../../../../context/AppointmentContext";
import Link from "next/link";
import { useSession } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const { upcomingApps, pastApps } = useAppointment();
    const { data: session, status } = useSession();
    return (
        <div className="flex h-full gap-12 flex-col items-center place-content-start font-['Inter']">
            {status === 'authenticated' && (
                <div>
                    <h1 className="text-4xl mb-5 text-white font-['Jomolhari']">
                        Welcome {session.user?.name}
                    </h1>
                </div>
            )}

            <Link
                href="/doctor-appointments"
                className="max-w-md mx-auto w-full md:w-1/3 bg-white rounded-xl  hover:bg-custom-hover-grey shadow-md overflow-hidden md:max-w-2xl divide-x grid grid-col-3 grid-flow-col"
            >
                <div className="col-span-1 ">
                    <button className="p-8">View Upcoming Appointments</button>
                </div>

                <div className="justify-center items-center col-span-1 p-8">
                    <button>{upcomingApps ? upcomingApps.length : 0}</button>
                </div>
            </Link>

            <div className="max-w-md mx-auto w-full md:w-1/3 bg-white rounded-xl shadow-md hover:bg-custom-hover-grey overflow-hidden md:max-w-2xl text-center">
                <button className="p-8 ">View Patients</button>
            </div>
        </div>
    );
}
