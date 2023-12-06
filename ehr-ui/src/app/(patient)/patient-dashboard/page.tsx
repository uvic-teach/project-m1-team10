"use client";
import { Inter } from "next/font/google";
import { useAuth } from "../../../../context/AuthContext";
import { redirect } from "next/navigation";
import { FaPlus } from "react-icons/fa";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    let { user } = useAuth();

    const numUpcoming: number = 6;

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
                    <div className="bg-custom-button-green rounded-xl p-3 left-0 hover:bg-custom-button-green/70">
                        <button className="text-white inline-flex">
                            <FaPlus className="-ml-0.5 mr-1.5 h-5 w-5" /> Book
                            an appointment
                        </button>
                    </div>

                    <div className="max-w-md mx-auto w-full md:w-1/3 bg-white rounded-xl hover:bg-custom-hover-grey shadow-md overflow-hidden md:max-w-2xl divide-x grid grid-col-3 grid-flow-col">
                        <div className="col-span-1 ">
                            <button className="p-6">
                                View Upcoming Appointments
                            </button>
                        </div>

                        <div className="justify-center items-center col-span-1 p-6">
                            <button>{numUpcoming}</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
