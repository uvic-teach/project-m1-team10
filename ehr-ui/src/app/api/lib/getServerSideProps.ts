import { IncomingMessage, ServerResponse } from 'http'
import { NextApiRequest, NextApiResponse } from 'next'
import { auth } from '../auth/auth'

export async function getServerSideProps(context: { req: (IncomingMessage & { cookies: Partial<{ [key: string]: string }> }) | NextApiRequest; res: ServerResponse<IncomingMessage> | NextApiResponse }) {
    const session = await auth(context.req, context.res)

    if (!session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return {
        props: {
            session,
        },
    }
}