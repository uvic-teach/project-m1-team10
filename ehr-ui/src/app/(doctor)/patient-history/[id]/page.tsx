"use client";
import { Inter } from "next/font/google";
import { Button } from "@/components/ui/button";
import { formatDateFromAPI, formatTime } from "@/lib/appointments";

const inter = Inter({ subsets: ["latin"] });

async function getPatientData ({ params }: { params: { id: number } }) {
    let response = await fetch(`https://project-m1-team10-8zys465ng-hungry-yumyummans-projects.vercel.app/api/patient/read/${params.id}`, {
        method: "GET"
    }) 

    let patientHistory = await response.json()
    console.log("patient " + patientHistory["user"])

    return patientHistory["user"]

}

export default async function Page({ params }: { params: { id: number } }) {

    const check = await getPatientData({params})
    return (
        <div className="flex h-full flex-col items-center">
            
            <div className="flex flex-col items-center w-full pt-1">
                <>      
                    {check.map((item:any, index:any) => {
                        return(
                            <>

                                <div
                                    key={index}
                                    className="bg-white flex py-2 pb-12 shadow-md rounded px-8 pt-6 w-1/2 mb-4 text-black"
                                >
                                    <p className="">
                                        <span className="font-bold text-xl">Patient {item.user}</span><br />
                                        <span>Date: {`${formatDateFromAPI(new Date(item.created_at).toDateString())}`}</span>
                                        <span>Doctor {item.doctor}</span><br/>
                                        <span>Description: {item.description}</span><br />
                                        
                                    </p>
                                   
                                    
                                    <div className="flex justify-between align-middle content-center pb-2">
                                        <Button>Te</Button>
                                    </div>
                                </div>
                            </>
                        )}
                    )}
                </>
                    
                
            </div>
        </div>
    );
}