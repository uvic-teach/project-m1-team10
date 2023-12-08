"use client";
import { Inter } from "next/font/google";
import { useAuth } from "../../../../context/AuthContext";
import { redirect } from "next/navigation";
import { FaPlus } from "react-icons/fa";
import { useAppointment } from "../../../../context/AppointmentContext";
import AppointmentCreate from "@/components/appointmentCreator";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    let { user } = useAuth();
    let { upcomingApps, pastApps } = useAppointment();

    return (
        <>
            {/* code below should show when user is logged in */}
            {user && (
                <div className="flex h-full gap-6 flex-col items-center place-content-start font-['Inter']">
                    <div>
                        <h1 className="text-4xl mb-4 text-white font-['Jomolhari']">
                            Welcome, {user.name}
                        </h1>
                    </div>
                    <AppointmentCreate />

                    {upcomingApps && (
                        <Link href="/appointments">
                            <div className=" bg-white rounded-lg hover:bg-custom-hover-grey shadow-md divide-x flex">
                                <button className="px-36 py-4">
                                    View Upcoming Appointments
                                </button>
                                <button className="px-12">
                                    {upcomingApps.length}
                                </button>
                            </div>
                        </Link>
                    )}
                </div>
            )}
        </>
    );
}
