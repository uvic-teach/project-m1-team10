import prisma from "@/app/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

//export const runtime = 'edge';

export async function GET(req: NextApiRequest, context: { params: any }) {

    const name = context.params.params[0]
    const email = context.params.params[1]
    const password = context.params.params[2]
    const id = context.params.params[3]

    try {
        const newUser = await prisma.user.create({
            data: { name, email, password, id },

        });
        return Response.json({ user: newUser, error: null })
    } catch (error) {
        return Response.json({ error: error, user: null })

    }
}