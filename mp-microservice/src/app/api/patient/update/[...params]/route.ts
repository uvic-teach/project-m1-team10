import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req:NextRequest, context: { params:any }) {
    try{
       
        if(context.params.params.length === 2){

            const historyID = parseInt(context.params.params[0])
            const description = context.params.params[1]

           

            const read = await fetch(`https://log-in-microservice.vercel.app/api/history/${historyID}`, {
                method: "GET"
            })

            const currentHistory = await read.json()

            const data = {
                user: currentHistory.user,
                description: description,
                doctor: currentHistory.doctor
            }


            const response = await fetch(`https://log-in-microservice.vercel.app/api/history/${historyID}`, {
                method: "PUT",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },

            })

            const update = await response.json()
            
            return NextResponse.json({PHN: currentHistory.user, updatedItem: update , error: null})

        }else{
            return NextResponse.json({response: "Invalid number of arguments"})
        }
       
    }catch (error){
        return NextResponse.json({error: error, user: null})
    }
    
}