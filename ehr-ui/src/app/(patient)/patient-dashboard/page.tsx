"use client";
import { Inter } from "next/font/google";
import { useAuth } from "../../../../context/AuthContext";
import { redirect } from "next/navigation";
import { FaPlus } from "react-icons/fa";
import { useTest } from "../../../../context/TestContext";
import AppointmentCreate from "@/components/appointmentCreator";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    let { user } = useAuth();
    let { appointments } = useTest();

    return (
        <>
            {/* code below should show when user is logged in */}
            {user && (
                <div className="flex h-full gap-12 flex-col items-center place-content-start font-['Inter']">
                    <div>
                        <h1 className="text-4xl mb-5 text-white font-['Jomolhari']">
                            Welcome, {user.name}
                        </h1>
                    </div>
                    <AppointmentCreate />

                    {appointments && (
                        <div className="max-w-md mx-auto w-full md:w-1/3 bg-white rounded-xl hover:bg-custom-hover-grey shadow-md overflow-hidden md:max-w-2xl divide-x grid grid-col-3 grid-flow-col">
                            <div className="col-span-1 ">
                                <button className="p-6">
                                    View Upcoming Appointments
                                </button>
                            </div>

                            <div className="justify-center items-center col-span-1 p-6">
                                <button>{appointments.length}</button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
