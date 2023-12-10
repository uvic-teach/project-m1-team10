import prisma from "@/app/lib/prisma";
import { SHA256 as sha256 } from "crypto-js";
import { NextRequest, NextResponse } from "next/server";

//export const runtime = 'edge';
const hashPassword = (str: string) => {
    return sha256(str).toString();
};

export async function GET(req: NextRequest, context: { params: any }) {

    const name = context.params.params[0]
    const email = context.params.params[1]
    const password = hashPassword(context.params.params[2])
    const id = context.params.params[3]

    try {
        const newUser = await prisma.user.create({
            data: { name, email, password, id },

        });
        return NextResponse.json({ user: newUser, error: null })
    } catch (error) {
        return NextResponse.json({ error: error, user: null })

    }
}