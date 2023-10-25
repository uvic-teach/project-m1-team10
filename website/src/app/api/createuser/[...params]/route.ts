import prisma from "@/app/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req:NextApiRequest, context: { params:any }) {

    const name = context.params.params[0]
    const email = context.params.params[1]
    
    try{
        const newUser = await prisma.User.create({
            data: {name,email,},

        });
        return Response.json({user: newUser, error: null})
    } catch (error){
        return Response.json({error: error.message, user: null})

    }
}