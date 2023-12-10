import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req:NextRequest, context: { params:any }) {
    try{
       
        if(context.params.params.length === 1){

            const historyID = parseInt(context.params.params[0])

            const response = await fetch(`https://log-in-microservice.vercel.app/api/history/${historyID}`, {
                method: "DELETE"
            })

            const deletedItem = await response.json()
            
            return NextResponse.json({user: deletedItem , error: null})

        }else{
            return NextResponse.json({response: "Invalid number of arguments"})
        }
       
    }catch (error){
        return NextResponse.json({error: error, user: null})
    }
    
}