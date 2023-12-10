import prisma from "@/app/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export async function GET(req: NextApiRequest, context: { params: any }) {

    const id = context.params.params[0]

    try {
        if (context.params.params.length === 1) {
            const user = await prisma.user.delete({
                where: { id: id },

            });
            return Response.json({ user: user, error: null })
        } else {
            return Response.json({ response: "Invalid number of arguments" })

        }

    } catch (error) {
        return Response.json({ error: error, user: null })

    }
}