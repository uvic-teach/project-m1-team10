import type { NextAuthOptions } from 'next-auth';
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import router from 'next/router';
import { z } from 'zod';

const doctorApiURL: string = "http://localhost:3001/api";

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: '/doctor/login',
        signOut: '/doctor/login',
        error: '/doctor/login'
    },
    callbacks: {
        // authorized({ auth, request: { nextUrl } }) {
        //     const isLoggedIn = !!auth?.user;
        //     const isOnDoctorPages = nextUrl.pathname.startsWith('/doctor');
        //     if (isOnDoctorPages) {
        //         if (isLoggedIn) return true;
        //         return false; // Redirect unauthenticated users to login page
        //     } else if (isLoggedIn) {
        //         return Response.redirect(new URL('/doctor', nextUrl));
        //     }
        //     return true;
        // },
        async session({ session, user, token }) {
            if (user !== null) {
                session.user = user;
            }
            return await session;
        },
    },
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            async authorize(credentials: any) {
                const parsedCredentials = z.object({ email: z.string(), password: z.string().min(1) }).safeParse(credentials);
                console.log("Successfully parsed credentials:", parsedCredentials);

                try {
                    let response = await fetch(`${doctorApiURL}/login`, {
                        method: "POST",
                        credentials: "include",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(parsedCredentials),
                    });
                    const doctor = await response.json();
                    console.log("recieved response");

                    if (response.ok && doctor) {
                        console.log("Doctor logged in");
                        return doctor;
                    } else if (response.json.toString() === "Invalid credentials") {
                        console.log("Login failed, invalid credentials.");
                        return "Invalid credentials";
                    } else {
                        console.log(response.json())
                    }
                    return null;

                } catch (error) {
                    console.log("Authentication error:", error);
                    return null;
                }

            },
            credentials: {}
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
