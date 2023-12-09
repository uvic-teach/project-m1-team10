import doctors from "@/app/interfaces/data"
import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server"

export async function GET(request: Request, context: { params:any }) {

    try{
    
        if(context.params.params.length === 1){

            const id = parseInt(context.params.params[0])

            const availability= await prisma.availability.findFirst({
                where: {
                    employeeId: {
                        equals: id,
                    },
                },
            })
            
            if(availability){
                return Response.json({response: availability})
            }else{
                return Response.json({response: "Unable to get availability because employee does not exist"})
            }

        }else{
            return Response.json({response: "Invalid number of arguments"})
        }
    
    }catch (error){
        return Response.json({error: error})
    }
   
}

export async function POST(req: Request, context: { params:any }) {
    try{

        const employeeId = parseInt(context.params.params[0])
        const hoursStart = context.params.params[1]
        const hoursEnd = context.params.params[2]
        const days = context.params.params[3].split(" ")
        const holiday = context.params.params[4].split(" ")
        
        //return Response.json({response: context.params.params})

        const upsertAvailabilty = await prisma.availability.upsert({
            where: {
                employeeId : employeeId
            },
            update:{
                hoursEnd: hoursEnd, 
                hoursStart:hoursStart,
                days: days,
                holiday: holiday
            },

            create:{
                employeeId : employeeId,
                hoursEnd: hoursEnd, 
                hoursStart:hoursStart,
                days: days,
                holiday: holiday
            }
        })

        return new NextResponse(JSON.stringify(upsertAvailabilty), {
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, PATCH, HEAD',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization, Origin, Accept, X-Requested-With, Accept, x-client-key, x-client-token, x-client-secret. Authorization',
                'Access-Control-Allow-Credentials': 'true'
            }
         })

        
        //return NextResponse.json({response: upsertAvailabilty, error: null})


    }catch (error){

        return Response.json({error: error})

    }

}