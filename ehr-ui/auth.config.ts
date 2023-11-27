import type { NextAuthOptions } from 'next-auth';
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import router from 'next/router';
import { z } from 'zod';

const doctorApiURL: string = "/api";

const options = {
    pages: {
        signIn: '/doctor/login',
        signOut: '/doctor/login',
        error: '/doctor/login'
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDoctorPages = nextUrl.pathname.startsWith('/doctor');
            if (isOnDoctorPages) {
                if (isLoggedIn) return true;
                return false; // Redirect unauthenticated users to login page
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/doctor', nextUrl));
            }
            return true;
        },
    },
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            async authorize(credentials: any) {
                const parsedCredentials = z.object({ email: z.string(), password: z.string().min(1) }).safeParse(credentials);

                let response = await fetch(`${doctorApiURL}/login`, {
                    method: "POST",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(parsedCredentials),
                });
                const doctor = await response.json();

                if (response.ok && doctor) {
                    console.log(doctor);

                    console.log("Doctor logged in");
                    router.push("/doctor/home");
                    return doctor;
                } else {
                    console.log("Login failed.");
                    return null;
                }
            },
            credentials: {}
        }),
    ],
} as NextAuthOptions;

export default (req: any, res: any) => NextAuth(req, res, options);
