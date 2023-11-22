import prisma from "@/app/lib/prisma";
import { NextApiResponse, NextApiRequest, NextApiHandler} from "next";

export async function POST(req:NextApiRequest, context: { params:any }) {
    try{

        const data = ""

        const newPatient = fetch(``, {
            method: "POST",
            body: JSON.stringify(data)
        })
        
        return Response.json({user: "Filler Response" , error: null})
    }catch (error){
        return Response.json({error: error, user: null})
    }
    
}