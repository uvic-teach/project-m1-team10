"use client";
import { Inter } from "next/font/google";
import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import TestNavBar from "@/components/test-navbar";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    

    return (
        <div className="flex h-full flex-col justify-center items-center bg-red-600">

            <h1 className="text-4xl mb-5 font-bold">This is the patient-lookup page</h1>

        </div>
        
        
            
            
            
            
        
    );
}