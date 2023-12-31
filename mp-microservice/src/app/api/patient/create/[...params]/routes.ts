import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest, context: { params:any }) {
    try{
       
        if(context.params.params.length === 3){

            const patientPHN = parseInt(context.params.params[0])
            const employeeID = parseInt(context.params.params[1])
            const description = parseInt(context.params.params[2])

            const  data = {
                "user": patientPHN, 
                "doctor": employeeID, 
                "description": description
            }

            const response = await fetch(`https://log-in-microservice.vercel.app/api/history/`, {
                method: "POST",
                body: JSON.stringify(data)
            })

            const Patient = await response.json()
            
            return NextResponse.json({PHN: patientPHN, user: Patient , error: null})


        }else{
            return NextResponse.json({response: "Invalid number of arguments"})
        }
       
    }catch (error){
        return NextResponse.json({error: error, user: null})
    }
    
}