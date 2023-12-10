import prisma from "@/app/lib/prisma";
import { NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest, context: { params: any }) {

    const id = context.params.params[0]

    try {
        if (context.params.params.length === 1) {
            const user = await prisma.user.delete({
                where: { id: id },

            });
            return NextResponse.json({ user: user, error: null })
        } else {
            return NextResponse.json({ response: "Invalid number of arguments" })

        }

    } catch (error) {
        return NextResponse.json({ error: error, user: null })

    }
}