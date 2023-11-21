import prisma from "@/app/lib/prisma";
import { NextApiResponse, NextApiRequest, NextApiHandler} from "next";

export async function POST(req:NextApiRequest, context: { params:any }) {
    try{
       
        if(context.params.params.length === 1){

            const patientPHN = parseInt(context.params.params[0])


            const response = await fetch(`https://log-in-microservice.vercel.app/api/user-history/${patientPHN}/`, {
                method: "POST",
                body: JSON.stringify({description:""})
            })

            const Patient = await response.json()
            
            return Response.json({PHN: patientPHN, user: Patient , error: null})


        }else{
            return Response.json({response: "Invalid number of arguments"})
        }
       
    }catch (error){
        return Response.json({error: error, user: null})
    }
    
}