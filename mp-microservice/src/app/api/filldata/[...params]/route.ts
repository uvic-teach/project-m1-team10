import prisma from "@/app/lib/prisma";
import { NextRequest } from "next/server";

export const runtime = 'edge';

export async function GET(req:NextRequest, context: { params:any }) {

    
}

export async function POST(req:NextRequest, context: { params:any }){

    const firstName = context.params.params[0]
    const lastName = context.params.params[1]

    try{
        const newEmployee = await prisma.employee.create({
            data: {firstName, lastName},

        });


        return Response.json({user: newEmployee, error: null})
    } catch (error){
        return Response.json({error: error, user: null})

    }


    
}