import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req?:NextRequest, context?: { params:any }) {
    try{

        const allAvailabilty = await prisma.user.findMany()
        return NextResponse.json({user: allAvailabilty, error: null})
    }catch (error){
        return NextResponse.json({error: error, user: null})
    }
    
}