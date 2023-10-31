import prisma from "@/app/lib/prisma";
import { NextApiResponse, NextApiRequest, NextApiHandler} from "next";

export async function GET(req:NextApiRequest, context: { params:any }) {
    try{
        const users = await prisma.User.findMany()
        return Response.json({user: users, error: null})
    }catch (error){
        return Response.json({error: error, user: null})
    }
    
}