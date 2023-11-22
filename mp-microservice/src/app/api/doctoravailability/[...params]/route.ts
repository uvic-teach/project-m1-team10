import doctors from "@/app/interfaces/data"
import prisma from "@/app/lib/prisma";
import { NextApiResponse, NextApiRequest, NextApiHandler} from "next";

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

        const id = parseInt(context.params.params[0])
        const employeeId = parseInt(context.params.params[1])
        const hoursStart = context.params.params[2]
        const hoursEnd = context.params.params[3]
        const days = context.params.params[4].split(' ')
        
        const unrefinedHoliday = context.params.params[5]
        let holiday = [];
        if(unrefinedHoliday){
            holiday  = unrefinedHoliday.map((date:any) => date.toISOString() )

        }

        //return Response.json({response: context.params.params})

        const upsertAvailabilty = await prisma.availability.upsert({
            where: {
                id: id, 
                employeeId : employeeId
            },
            update:{
                hoursEnd: hoursEnd, 
                hoursStart:hoursStart,
                days: days
            },

            create:{
                employeeId : employeeId,
                hoursEnd: hoursEnd, 
                hoursStart:hoursStart,
                days: days,
                holiday: holiday
            }
        })
        return Response.json({response: upsertAvailabilty})



    }catch (error){

        return Response.json({error: error})

    }

}