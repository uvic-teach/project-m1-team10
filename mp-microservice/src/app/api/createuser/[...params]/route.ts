import prisma from "@/app/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { SHA256 as sha256 } from "crypto-js";

//export const runtime = 'edge';
const hashPassword = (str: string) => {
    return sha256(str).toString();
};

export async function GET(req: NextApiRequest, context: { params: any }) {

    const name = context.params.params[0]
    const email = context.params.params[1]
    const password = hashPassword(context.params.params[2])
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