//"use client";
import { auth } from "@/app/api/auth/auth";
import { useAuth } from "../../../../context/AuthContext";
import { SessionProvider } from "next-auth/react"

export default async function Home() {

    const session = await auth();
    return (
        <>
            <h1>This is the Medical Professional home page</h1>
            {!session?.user && <p>You are not logged in</p>}
            {session?.user && <p>Welcome {session.user.name}</p>}
        </>
    );
}


// export default function App({
//     Component,
//     pageProps: { session, ...pageProps },
// }) {
//     return (
    
//   )
// }