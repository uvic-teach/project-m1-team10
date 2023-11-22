import prisma from "@/app/lib/prisma";
import { NextApiResponse, NextApiRequest, NextApiHandler} from "next";

export async function GET(req:NextApiRequest, context: { params:any }) {
    try{
        const allAvailabilty = await prisma.availability.findMany()
        return Response.json({user: allAvailabilty, error: null})
    }catch (error){
        return Response.json({error: error, user: null})
    }
    
}