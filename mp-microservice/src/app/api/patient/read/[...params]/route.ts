import prisma from "@/app/lib/prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req:NextRequest, context: { params:any }) {
    try{
       
        if(context.params.params.length === 1){

            const patientPHN = parseInt(context.params.params[0])


            const response = await fetch(`https://log-in-microservice.vercel.app/api/history?phn=${patientPHN}`, {
                method: "GET"
            })

            const Patient = await response.json()
            
            return NextResponse.json({ user: Patient , error: null})

        }else{
            return NextResponse.json({response: "Invalid number of arguments"})
        }
       
    }catch (error){
        return NextResponse.json({error: error, user: null})
    }
    
}